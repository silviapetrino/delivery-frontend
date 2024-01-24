<script>
import axios from 'axios';
import { store } from '../../data/store';

export default {
  name: 'ContactForm',
  components:{
  },
  data() {
    return {
      store,
      name:'',
      email:'',
      message:'',
      address:'',
      phone:'',
      success: false,
      errors: {
        name:[],
        email:[],
        message:[],
        address:[],
        phone:[],
      }
    }
  },
  methods: {
    getRestaurantId(restaurantId) {
      const restaurant = store.restaurants.find(r => r.id === restaurantId);
      return restaurant ? restaurant.id : '';
    },
//     getRestaurantId(restaurantId) {
//   const restaurant = store.restaurants.find(r => r.id === restaurantId);
//   const result = restaurant ? restaurant.id : '';
//   console.log(result);
//   return result;
// },

    sendForm(){
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
        address: this.address,
        phone: this.phone,
      }
      axios.post(store.apiUrl + 'send-email', data)
           .then(response => {
            console.log(response.data);
            this.success = response.data.success;
            if(!this.success){
              this.errors = response.data.errors;
            }
           })
           .catch(error =>{
            console.log('ERRORE!!!', error);
           })
    }
  },
  mounted() {
  }
}
</script>

<template>

  <div v-if="!success" class="container">
    <h1>Compila il form!</h1>
    <form @submit.prevent="sendForm()">
      <div>
        <input type="hidden" name="restautrant_id" :value="getRestaurantId(store.cart[0].restaurant_id)">
      </div>
      <div>
        <label for="name">Insert your name</label>
        <input v-model="name" type="text" name="name" id="name">
        <p v-for="error in errors.name" class="error">{{ error }}</p>
      </div>
      <div>
        <label for="email">Insert your email</label>
        <input v-model="email" type="text" name="email" id="email">
        <p v-for="error in errors.email" class="error">{{ error }}</p>
      </div>
      <div>
        <label for="message">Insert a message</label>
        <textarea v-model="message" name="message" id="message"></textarea>
        <p v-for="error in errors.message" class="error">{{ error }}</p>
      </div>
      <div>
        <label for="address">Isert your address</label>
        <input v-model="address" type="text" name="address" id="address">
        <p v-for="error in errors.address" class="error">{{ error }}</p>
      </div>
      <div>
        <label for="phone">Isert your phone number</label>
        <input v-model="phone" type="text" name="phone" id="phone">
        <p v-for="error in errors.phone" class="error">{{ error }}</p>
      </div>

      <div>
        <button type="submit">Invia</button>
      </div>
    </form>
    
  </div>

  <div class="container" v-else>
    <h1>EMAIL INVIATA CORRETTAMENTE!!!</h1>
  </div>

</template>


<style lang="scss" scoped>

form{
  label , input , textarea , button{
    display: block;
    margin: 10px;
    width: 800px;
  }
}

.error{
  color: red;
  margin: 10px;
}
</style>