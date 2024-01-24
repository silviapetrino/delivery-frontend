<script>
import { store } from '../../data/store';
import axios from 'axios';
import { DateTime } from 'luxon';

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
      this.submitPayment();
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
  },
};
</script>

<template>
  <div>
    {{ console.log(currentDate) }}
    <h4>Complete the payment</h4>
    <form @submit.prevent="handleSubmit">
      <div id="dropin-container"></div> <!-- Container for Drop-in UI -->
      <input type="text" v-model="customerName" placeholder="Customer Name">
      <input type="text" v-model="customerAddress" placeholder="Customer Address">
      <input type="email" v-model="customerEmail" placeholder="Customer Email">
      <input type="number" v-model="customerPhone" placeholder="Customer Phone">

      <button type="submit" @click="clearCart(product)">Submit Payment</button>
    </form>
  </div>
</template>