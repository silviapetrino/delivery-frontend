
<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
  name: "PaymentForm",
  data() {
    return {
      store,
      clientToken: null, // Token per inizializzare Braintree Drop-in
      dropinInstance: null, // Aggiungi questo per tenere traccia dell'istanza
    };
  },
  methods: {
    async getClientToken() {
  try {
    const response = await axios.get(store.apiUrl+'payment/token');
    this.clientToken = response.data.token;
    console.log("Client token ricevuto:", this.clientToken); // Aggiungi questo
    this.initializeDropin(); // Inizializza la Drop-in UI qui
  } catch (error) {
    console.error("Errore nel recuperare il client token:", error);
  }
},

    initializeDropin() {
      if (!this.clientToken || !document.getElementById('dropin-container')) {
        console.error("Token non disponibile o container non trovato.");
        return;
      }

      braintree.dropin.create({
        authorization: this.clientToken,
        container: '#dropin-container'
      }, (error, dropinInstance) => {
        if (error) {
          console.error("Errore nell'inizializzazione di Braintree:", error);
        } else {
          this.dropinInstance = dropinInstance;
        }
      });
    },

    submitPayment() {
      if (!this.dropinInstance) {
        console.error("Drop-in instance non è definita");
        return;
      }
      this.dropinInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error("Errore nella richiesta del payment method:", error);
          return;
        }
        axios.post(store.apiUrl+'payment/checkout', {
          payment_method_nonce: payload.nonce
        }).then(response => {
          // Gestisci la risposta del server
          console.log('Transazione completata:', response);
        }).catch(error => {
          console.error("Errore nella transazione:", error);
        });
      });
    },
  },
  mounted() {
    this.getClientToken(); // Chiamata al metodo getClientToken
  }
};
</script>

<template>
  <div>
    <div id="dropin-container"></div> <!-- Container per la Drop-in UI -->
    <form action="" method="post">
      <input type="hidden" name="amount" id="amount" value="{{ store.cart }}">
      <button @click="submitPayment">Invia Pagamento</button>
    </form>
  </div>
</template>