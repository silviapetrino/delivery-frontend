<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
  name: "PaymentForm",
  data() {
    return {
      store,
      clientToken: null, // Token per inizializzare Braintree Drop-in
      customerName:'',
      customerAddress:'',
      customerEmail:'',
      customerPhone:'',
      customerNotes:'',
      orderTotal: 0,

    };
  },
  methods: {
    async getClientToken() {
      try {
        const response = await axios.get(store.apiUrl+'payment/token');
        this.clientToken = response.data.token;
      } catch (error) {
        console.error("Errore nel recuperare il client token:", error);
      }
    },

    handleSubmit(){
      this.submitPayment();
    },

    submitPayment() {
    this.dropinInstance.requestPaymentMethod((error, payload) => {
      if (error) {
        console.error("Errore nella richiesta del payment method:", error);
        return;
      }
      axios.post(store.apiUrl+'payment/checkout', {
        payment_method_nonce: payload.nonce,
        amount : store.totalPrice
      }).then(response => {
        console.log(response);
      
      }).catch(error => {
        // Gestisci errori nella richiesta
      });
    });
    this.orderTotal = store.totalPrice;
    this.sendOrderData(); // DOPO aver mandato il tutto a Braintree faccio partire la chiamata per inviare i dati che ci sono necessari per conservare l'ordine nel backend.
    
    },

    sendOrderData(){
      axios.post(store.apiUrl +'orders', {
        customer_name: this.customerName,
        customer_address: this.customerAddress,
        customer_email: this.customerEmail,
        customer_phone: this.customerPhone,
        total_price: this.orderTotal,
        customer_notes: this.customerNotes,
        products: store.cart.map(product => ({
          id: product.id,
          quantity: product.quantity
    }))
      }).then(response =>{
        console.log('ORDINE CREATO: ' + response);
      }).catch(err =>{
        console.log('QUALCOSA è ANDATO STORTO IN CREAZIONE ORDINE');
      });
    }
  },
  mounted() {
     this.getClientToken().then(() => {
    if (this.clientToken) {
      braintree.dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container'
      }, (error, dropinInstance) => {
        if (error) console.error(error);
        else this.dropinInstance = dropinInstance;
      });
    }
  });
  }
};
</script>


<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div id="dropin-container"></div> <!-- Container per la Drop-in UI -->
        <input type="text" v-model="customerName" placeholder="customerName">
        <input type="text" v-model="customerAddress" placeholder="customerAddress">
        <input type="email" v-model="customerEmail" placeholder="customerEmail">
        <input type="number" v-model="customerPhone" placeholder="customerPhone">
        <input type="text" v-model="customerNotes" placeholder="customerNotes">
        <button type="submit">Invia Pagamento</button>
    
    </form>
  </div>
</template>

