<script>
import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';

export default {
  name: 'Home',
  data() {
    return {
      store,
      restaurant_id:'',
      restaurant: {},
      isLoading: true,
      cart: []
    }
  },

  components:{
    Loader,
  },

  methods: {
    getRestaurant(restaurant_id){
      axios.get(store.apiUrl + 'restaurants/restaurant-detail/' + restaurant_id).then(res=>{
        this.restaurant = res.data;
        this.isLoading = false;
        console.log(res.data);
      })
    },
     
    addToCart(product){
      this.cart.push(product);
      
      this.saveCart();
    },
    
    removeFromCart(index){
      this.cart.splice(index , 1);
      this.saveCart();
    },

    saveCart(){
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }




  },
  created(){
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart){
      this.cart = cart;
    }
  },
  mounted() {
    this.restaurant_id = this.$route.params.id;
    this.getRestaurant(this.restaurant_id);
    
  }
}
</script>

<template>

  <div  v-if="isLoading" class="d-flex justify-content-center pt-5">
    <Loader />
  </div>
  
  
  <div v-else>
  
    <div v-if="restaurant.products.length === 0">
        <h2>Sorry, no products available for this resaurant.</h2>
    </div>

    <div v-else>
      
        <h1 class="text-center mb-5">{{restaurant.name}}</h1>
    
        <div class="d-flex gap-5 flex-wrap justify-content-center">
          <div v-for="(product, index) in restaurant.products" :key="product.id">
    
            <div v-if="product.visibility == 1"  class="card" style="width: 18rem;">
      
              <img class="card-img-top" :src="product.image" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{product.name}} </h5>
                <span>{{ product.price }} &euro; </span>
                <p class="card-text">{{product.description}}</p>
                <p>Ingredients: {{ product.ingredients }}</p>
                <button @click="addToCart(product)" class="btn btn-primary">Add to cart</button>
                <button @click="removeFromCart(index)" class="btn btn-danger">Removefrom cart</button>
              </div>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  

<div class="container" id="cart">
  <h1>il mio carrello!</h1>
  <ul>
    <li v-for="(product , index) in cart" :key="index">{{ console.log(product)
     }}</li>
  </ul>
</div>
</template>

<style lang="scss" scoped>
#cart{
  border: 1px solid black;
}
</style>