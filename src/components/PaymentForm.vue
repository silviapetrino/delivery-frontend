<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
  name: "PaymentForm",
  data() {
    return {
      store,
      clientToken: null, // Token per inizializzare Braintree Drop-in
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

    },
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
    <div id="dropin-container"></div> <!-- Container per la Drop-in UI -->
    <button @click="submitPayment">Invia Pagamento</button>
  </div>
</template>

