<script>
import { store } from '../../data/store';
import axios from 'axios';
import { DateTime } from 'luxon';

import { validateCustomerName, validateCustomerAddress, validateCustomerEmail, validateCustomerPhone } from '../../data/validation.js'; 


export default {
  name: 'PaymentForm',
  data() {
    return {

      store,
      clientToken: null,
      customerName: '',
      customerAddress: '',
      customerEmail: '',
      customerPhone: '',
      orderTotal: 0,
      currentDate: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      dropinInstance: null,


      /* VALIDATION */
      submitAttempted: false,
      isNameValid: null,
      isAddressValid: null,
      isEmailValid: null,
      isPhoneValid: null,

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

    handleSubmit() {
      this.submitAttempted = true;
      this.validateName();
      this.validateAddress();
      this.validateEmail();
      this.validatePhone();

      if (this.isNameValid && this.isAddressValid && this.isEmailValid && this.isPhoneValid) {
        this.submitPayment();
      } else {
        // Gestire il caso in cui la validazione fallisce
      }
    },

    submitPayment() {
      this.dropinInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error('Error requesting payment method:', error);
          return;
        }

        axios.post(`${store.apiUrl}payment/checkout`, {
          payment_method_nonce: payload.nonce,
          amount: store.totalPrice,
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.error('Error in payment checkout request:', error);
        });
      });

      this.orderTotal = store.totalPrice;
      this.sendOrderData();
    },

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
          this.clearCart();
          this.$router.push({ name: 'results' });
      }).catch(error => {
          console.error('Something went wrong in order creation:', error);
          this.$router.push({ name: 'error404' });
      });
    },
    saveCart(){
      localStorage.setItem('cart', JSON.stringify(store.cart));
    },
    clearCart() {
      store.cart = [];
      this.saveCart();
    },

/* VALIDATION */
    validateName() {
      const isValid = validateCustomerName(
        this.customerName, 
        '#errorName', 
        '#name',
        this.submitAttempted
      );
      this.isNameValid = isValid;
    },

    validateAddress() {
      this.isAddressValid = validateCustomerAddress(
        this.customerAddress, 
        '#errorAddress', 
        '#address', 
        this.submitAttempted
      );
    },
    validateEmail() {
      this.isEmailValid = validateCustomerEmail(
        this.customerEmail, 
        '#errorEmail', 
        '#email', 
        this.submitAttempted
      );
    },
    validatePhone() {
      this.isPhoneValid = validateCustomerPhone(
        this.customerPhone, 
        '#errorPhone', 
        '#phone', 
        this.submitAttempted
      );
    },
  
  },

  watch: {
    customerName(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.validateName();
    }
  },
  customerAddress(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.validateAddress();
    }
  },
  customerEmail(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.validateEmail();
    }
  },
  customerPhone(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.validatePhone();
    }
  },
  },


  mounted() {
    this.getClientToken().then(() => {
      if (this.clientToken) {
        braintree.dropin.create({
          authorization: this.clientToken,
          container: '#dropin-container',
        }, (error, dropinInstance) => {
          if (error) {
            console.error('Error creating Drop-in instance:', error);
          } else {
            this.dropinInstance = dropinInstance;
          }
        });
      }
    });
    /* VALIDATION */
    $('#name').on('input', this.validateName);
    $('#address').on('input', this.validateAddress);
    $('#email').on('input', this.validateEmail);
    $('#phone').on('input', this.validatePhone);
  },
};
</script>

<template>
  <div>
    {{ console.log(currentDate) }}
    <h4>Complete the payment</h4>
    <form novalidate class="w-50" @submit.prevent="handleSubmit">
      <div id="dropin-container"></div> <!-- Container for Drop-in UI -->

      <label for="name" class="form-label my-1">Name:</label>
      <input id="name" class="form-control" type="text" v-model="customerName" placeholder="Your name">
      <div id="errorName" class="text-danger"></div>

      <label for="address" class="form-label my-1">Address:</label>
      <input id="address" class="form-control" type="text" v-model="customerAddress" placeholder="Your address">
      <div id="errorAddress" class="text-danger"></div>


      <label for="email" class="form-label my-1">Email:</label>
      <input id="email" class="form-control" type="text" v-model="customerEmail" placeholder="Your email">
      <div id="errorEmail" class="text-danger"></div>


      <label for="phone" class="form-label my-1">Phone:</label>
      <input id="phone" class="form-control" type="text" v-model="customerPhone" placeholder="Your phone">
      <div id="errorPhone" class="text-danger"></div>


      <button class="btn btn-success my-3" type="submit" >Submit Payment</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>

.is-warning {
  border-color: orange;
}
.is-valid {
  border-color: green;
}
.is-invalid {
  border-color: red;
}

</style>