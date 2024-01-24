<script>
import { store } from '../../data/store';
import axios from 'axios';
import { DateTime } from 'luxon';




export default {
  name: 'PaymentForm',
  data() {
    return {
      brainrtreeLoaded:false,
      hostedFieldsInstance: null,
      store,
      clientToken: null,
      customerName: '',
      customerAddress: '',
      customerEmail: '',
      customerPhone: '',
      orderTotal: 0,
      currentDate: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      dropinInstance: null,
    };
  },
  methods: {

    async getClientToken() {
      try {
        const response = await axios.get(`${store.apiUrl}payment/token`);
        this.clientToken = response.data.token;
      } catch (error) {
        console.error('Error fetching client token:', error);
      }
    },
/* ---------------------------------------------------------------------------------- */
    async createHostedFields() {
    
      if (!this.braintreeLoaded) {
        console.error('Braintree SDK not loaded yet');
        return;
      }
      
    try {

      if(!window.braintree){
        throw new Error("Braintree SDK not loaded");
      }

      const clientInstance = await window.braintree.client.create({
        authorization: this.clientToken
      });

      window.braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            // Stili personalizzati qui
          }
        },
        fields: {
          number: {
            selector: '#cc-number',
            placeholder: '4111 1111 1111 1111'
          },
          cvv: {
            selector: '#cc-cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#cc-expiration',
            placeholder: 'MM/YY'
          },
          cardholderName: {
            selector: '#cc-name',
            placeholder: 'Nome sulla carta'
          }
        }
      }, (error, hostedFieldsInstance) => {
        if (error) {
          console.error('Error creating hosted fields:', error);
          return;
        }
        this.hostedFieldsInstance = hostedFieldsInstance;
      });
    } catch (error) {
      console.error('Error creating client instance:', error);
    }
  },

/* ---------------------------------------------------------------------------------- */

    submitPayment() {

      this.hostedFieldsInstance.tokenize(async (error, payload) => {
      if (error) {
        console.error('Error tokenizing:', error);
        return;
      }

      try {
        await axios.post(`${store.apiUrl}payment/checkout`, {
          payment_method_nonce: payload.nonce,
          amount: store.totalPrice,
        });
        console.log('Payment successful');
      } catch (error) {
        console.error('Error in payment checkout request:', error);
        return;
      }

      //POI mando dati ordine
      this.orderTotal = store.totalPrice;
      this.sendOrderData();
    });
    },



/* ---------------------------------------------------------------------------------- */

    sendOrderData() {
      axios.post(`${store.apiUrl}orders`, {
        date: this.currentDate,
        total_price: this.orderTotal,
        customer_name: this.customerName,
        customer_address: this.customerAddress,
        customer_email: this.customerEmail,
        customer_phone: this.customerPhone.toString(),
        products: store.cart.map(product => ({
          id: product.id,
          quantity: product.quantity,
        })),
      }).then(response => {
          console.log('ORDER CREATED:', response);
          /* this.clearCart(); */
          this.$router.push({ name: 'results' });
      }).catch(error => {
          console.error('Something went wrong in order creation:', error);
          this.$router.push({ name: 'error404' });
      });
    },

/* ---------------------------------------------------------------------------------- */
    saveCart(){
      localStorage.setItem('cart', JSON.stringify(store.cart));
    },
    clearCart() {
      store.cart = [];
      this.saveCart();
    },
  },
  mounted() {
    if (window.braintree && window.braintree.client) {
    this.getClientToken().then(() => {
      this.braintreeLoaded = true;
      this.createHostedFields();
    });
  } else {
    // Aspetta il caricamento dello script SDK di Braintree
    const braintreeScript = document.createElement('script');
    braintreeScript.src = 'https://js.braintreegateway.com/web/3.76.0/js/client.min.js';
    braintreeScript.onload = () => {
      // Una volta che lo script è caricato, ottieni il token e crea i campi
      this.getClientToken().then(() => {
        this.createHostedFields();
      });
    };
    document.head.appendChild(braintreeScript);
  }
  },
};
</script>

<template>
  <div class="bootstrap-basic">
    <h4>Complete the payment</h4>
    <form @submit.prevent="submitPayment" class="needs-validation" novalidate="">
      
      <div class="row">
        <!-- Hosted Fields per BRAINTREE -->
        <div class="col-sm-6 mb-3">
          <label for="cc-name">Cardholder Name</label>
          <div class="form-control" id="cc-name"></div>
        </div>
        <div class="col-sm-6 mb-3">
          <label for="cc-number">Credit card number</label>
          <div class="form-control" id="cc-number"></div>
        </div>
        <div class="col-sm-3 mb-3">
          <label for="cc-expiration">Expiration</label>
          <div class="form-control" id="cc-expiration"></div>
        </div>
        <div class="col-sm-3 mb-3">
          <label for="cc-cvv">CVV</label>
          <div class="form-control" id="cc-cvv"></div>
        </div>
      </div>

      <!-- Dati necessari alla compilazione di ORDER -->
      <div class="row">
        <div class="col-sm-6 mb-3">
          <label for="customerName">Customer Name</label>
          <input type="text" class="form-control" id="customerName" v-model="customerName" placeholder="Customer Name">
        </div>
        <div class="col-sm-6 mb-3">
          <label for="customerAddress">Customer Address</label>
          <input type="text" class="form-control" id="customerAddress" v-model="customerAddress" placeholder="Customer Address">
        </div>
        <div class="col-sm-6 mb-3">
          <label for="customerEmail">Customer Email</label>
          <input type="email" class="form-control" id="customerEmail" v-model="customerEmail" placeholder="Customer Email">
        </div>
        <div class="col-sm-6 mb-3">
          <label for="customerPhone">Customer Phone</label>
          <input type="number" class="form-control" id="customerPhone" v-model="customerPhone" placeholder="Customer Phone">
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary btn-lg" type="submit">Submit Payment</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
 

.toast {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 9999;
}

.bootstrap-basic {
  background: white;
}

/* Braintree Hosted Fields styling classes*/
.braintree-hosted-fields-focused {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.braintree-hosted-fields-focused.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>