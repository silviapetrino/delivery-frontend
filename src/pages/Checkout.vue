<script>
import { store } from '../data/store';
import PaymentForm from '../components/partials/PaymentForm.vue';
import ContactForm from '../components/partials/ContactForm.vue';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';



export default {
  name: 'Checkout',
  components: {
    PaymentForm,
    Loader,
    ContactForm

  },
  data() {
    return {
      store,

    }
  },
  methods: {
    getRestaurantName(restaurantId) {
      const restaurant = store.restaurants.find(r => r.id === restaurantId);
      return restaurant ? restaurant.name : '';
    },
    getTotalPrice() {
      let totalPrice = 0;
      for (const product of this.store.cart) {
        totalPrice += product.price * product.quantity;
      }
      store.totalPrice = totalPrice;
      return totalPrice.toFixed(2);
    },
    getTotalQuantity() {
      let totalQuantity = 0;
      for (const product of this.store.cart) {
        totalQuantity += product.quantity;
      }
      return totalQuantity;
    },
  },
  created() {
    axios.get(store.apiUrl + 'restaurants').then(results => {
          store.restaurants = results.data;
          this.isLoading = false;
        });
  },
  mounted(){
    
  }
}
</script>

<template>
  <div class="container py-5">
    <h2>CHECKOUT</h2>
    <h3>Your are ordering from:</h3>
    <h4>{{ getRestaurantName(store.cart[0].restaurant_id) }}</h4>
    <h5>Your order is:</h5>
    <table v-if="store.cart.length > 0" class="table table-custom d-table table-borderless w-50">
      <thead>
        <tr class="text-center">
          <th scope="col ">Products</th>
          <th scope="col ">Quantity</th>
          <th scope="col ">Price e/a</th>
          <th scope="col ">Price </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product , index) in store.cart" :key="index" class="line">
          <th scope="row">{{ product.name }}</th>
          <td class="text-center d-flex justify-content-center align-items-center">
            <span class="quantity mx-1">{{ product.quantity }}</span>
          </td >
          <td class="text-center">{{ (product.price) }} &euro;</td>
          <td class="text-center">{{ (product.price * product.quantity).toFixed(2) }} &euro;</td>
        </tr>
        <tr>
          <th>Total:</th>
          <th class="text-center">{{ getTotalQuantity() }}</th>
          <th></th>
          <th class="text-center">{{ getTotalPrice() }} &euro;</th>
        </tr>
      </tbody>
    </table>
    <h4>If you want to order more products from {{ getRestaurantName(store.cart[0].restaurant_id) }} click 
      <a class="link text-white text-decoration-none btn" :href="'/restaurant-detail/' + store.cart[0].restaurant_id">
        HERE
      </a>
    </h4>
    <h5 class="my-4">or else you can ....</h5>
    <PaymentForm/>
    <ContactForm/>
  </div>
</template>

<style lang="scss" scoped>
@use '../scss/main.scss' as *;
  table , tr{
    border: 1px solid $secondary_color;
  }
  .link{
    background-color: $secondary_color;
  }
</style>
