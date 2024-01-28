<script>
import { store } from '../../data/store';
import axios from 'axios';
export default {
  name: 'HeaderComponent',
  data(){
    return{
      store,
    }
  },
  methods: {
    removeFromCart(index){
      store.cart.splice(index , 1);
      this.saveCart();
      if (store.cart.length === 0) {
        this.$router.push({ name: 'home' });
      }
    },

    saveCart() {
    localStorage.setItem('cart', JSON.stringify(store.cart));
    },
    clearCart() {
      store.cart = [];
      this.saveCart();
    },
    decreaseQuantity(index){
      const product = store.cart[index];
      if(product.quantity > 1){
        product.quantity--;
        if(product.quantity === 0){
          this.removeFromCart(index);
        }
        this.saveCart();
      }
    },
    increaseQuantity(index){
      const product = store.cart[index];
      if(product.quantity > 0){
        product.quantity++;
        this.saveCart();
      }
    },
    getTotalPrice() {
      let totalPrice = 0;
      for (const product of this.store.cart) {
        totalPrice += product.price * product.quantity;
      }
      store.totalPrice = totalPrice;
      return totalPrice.toFixed(2);
    },

    getRestaurantName(restaurantId) {
      const restaurant = store.restaurants.find(r => r.id === restaurantId);
      this.saveCart();
      return restaurant ? restaurant.name : '';
    },
    goToCheckOut(){
      this.$router.push({ name: 'checkout' });
    }
  },
  // al created recupero la lista ristoranti per evitare problema asincronicità del codice 
  created() {
    const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        store.cart = JSON.parse(savedCart);
      }

    axios.get(store.apiUrl + 'restaurants').then(results => {
          store.restaurants = results.data;
          this.isLoading = false;
        });
        
  }
  
}

</script>

<template>

<header>

<div class="container d-flex justify-content-between align-items-center h-100">
   <!-- navbar links -->
  <nav class="d-flex align-items-center h-100 gap-5">

    <router-link :to="{name: 'home'}" class="navbar-brand fs-4 h-100" href="#">
        <img src="/img/logo.jpg" alt="Deliveboo_logo" class="logo h-100 p-2">
        <span class= "brand d-none d-sm-inline-block ">DeliveBoo</span>
    </router-link>

    <ul class="d-flex p-0 m-0 gap-3">
      <li>
        <router-link :to="{name: 'home'}">Home</router-link>
      </li>
      <li>
        <a href="#search-restaurant">Search Restaurant</a>
      </li>
      <li>
        <router-link :to="{name: 'aboutUs'}">About Us</router-link>
      </li>
    </ul>

  </nav>
  <!-- /navbar links  -->
  <!-- cart button and offcanvas  -->
  <div class="shop ">

    <div class="cart-container position-relative">
      <div v-if="store.cart.length > 0" class="cart-counter position-absolute d-flex justify-content-center align-items-center ">
        <span>{{ store.cart.length}}</span>
      </div>
      <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>

    <div class="offcanvas offcanvas-end offcanvas-custom" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      
        <div class="container" id="cart">
          <div class="offcanvas-header">
            <h3 class="offcanvas-title" id="offcanvasRightLabel">Cart Shopping</h3>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
          <h5>Order Summary</h5>
          <h5 style="width: 250px;" class="text-danger" v-if="store.cart.length === 0">You don't have any product in your cart, feel free to add as many product as you want from your favourite restaurant!</h5> 
          <table v-if="store.cart.length > 0" class="table table-custom d-table table-borderless ">
            <thead>
              <tr class="text-center">
                <th scope="col ">Product</th>
                <th scope="col ">Quantity</th>
                <th scope="col ">Price</th>
                <th scope="col ">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product , index) in store.cart" :key="index" class="line">
                <th scope="row">{{ product.name }}</th>
                <td class="text-center d-flex justify-content-center align-items-center">
                  <button @click="() => decreaseQuantity(index)" class=" action btn btn-danger"><i class="fa-solid fa-minus"></i></button>
                  <span class="quantity mx-1">{{ product.quantity }}</span>
                  <button @click="() => increaseQuantity(index)" class=" action btn btn-success "><i class="fa-solid fa-plus"></i></button>
                </td >
                <td class="text-center price">{{ (product.price * product.quantity).toFixed(2) }} &euro;</td>
                <td class="d-flex justify-content-center">
                  <button @click="removeFromCart(index)" class="btn btn-danger action"><i class="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
            </tbody>
          </table>

          <span v-if="store.cart.length > 0" class="d-block fs-5"><strong>Total: </strong>{{ getTotalPrice() }} &euro;</span>
        
        
          <div v-if="store.cart.length > 0">
            <div class="my-2">
              <h3>Your cart is from:</h3>
              <h4>{{ getRestaurantName(store.cart[0].restaurant_id) }}</h4>
              <p class="fw-bold text-danger">If you wish to order from a different restaurant, please empty your cart first; <br /> otherwise, proceed to checkout
              </p>
              <div class="d-flex gap-2">
                <a class="text-white text-decoration-none badge-cs d-flex justify-content-center align-items-center" :href="'/restaurant-detail/' + store.cart[0].restaurant_id">
                Go back to restaurant
                </a>
                <button type="button" class="btn btn-danger" data-bs-dismiss="offcanvas" aria-label="Close" v-if="store.cart.length > 0" @click="clearCart(product)">
                  <router-link v-if="store.cart.length > 0" :to="{name: 'home'}" class="text-decoration-none">Clear cart</router-link>
                </button>
                <button type="button" class="btn btn-success " data-bs-dismiss="offcanvas" aria-label="Close"  @click="goToCheckOut()" v-if="store.cart.length > 0">
                  Go to payment<i class="fa-solid fa-credit-card ms-2"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- cart button and offcanvas  -->

  </div>
</div>

</header>

</template>


<style lang="scss" scoped>
@use '../../scss/main.scss' as *;



header {
  width: 100%;
  height: 70px;
  background-color: $tertiary_color;
  color: $secondary_color;
  box-shadow: 2px 4px 10px;
  position: fixed;
  top: 0;
  z-index: 999;
  nav{
    router-link, a {
      color: $primary_color;
      &:hover, &.active {
        color: $secondary_color;
      }
    }
    a{
      .brand{
        color: $detail_color;
        font-size: 1.6rem;
        font-weight: 800;
        text-shadow:
          2px 2px 1px $primary_color,
          -2px 2px 1px $primary_color,
          -2px -2px 0 $primary_color,
          2px -2px 0 $primary_color;
      }
      .logo{
        border-radius: 50%;
        h3 {
          font-weight: 700;
        }
        img {
          width: 60px;
          border-radius: 35%;
          margin: 0 5px 0 0;
        }
      }
    &:hover{
      scale: 1.1;
      }
    }
  }
  .cart-container{
    button i {
      font-size: 2rem;
      color: $secondary_color;
      &:hover {
        color: $primary_color;
      }
    }
    .cart-counter{
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      background-color: red;
      right: 0;
      top: -5px;
      span{
        color: white;
      font-weight: 800;
      }
    }
  }
  .offcanvas-custom {
    width: auto !important;
    background-color: $primary_color;
    color: $secondary_color;
    h3 {
      font-weight: bold;
    }
    th, td {
      background-color: $primary_color !important;
      color: $secondary_color;
    }
    .quantity{
      display:inline-block;
      width:20px;
      font-size: 15px;
    }
    .price{
      width: 80px;
    }
    .line{
      height: 20px;
      line-height: 20px;
    }

    .action{
      width:5vw;
      height:5vw;
      font-size: 10px;
      display:flex;
      justify-content: center;
      align-items: center;
    
    }
    @media all and (min-width: 576px){
      .action{
      width:30px;
      height:30px;
      padding: 5px;
      font-size: 15px;

    
    }

    }
  }
}

.badge-cs {
      background-color: $secondary_color;
      padding: 2px 10px;
      border-radius: 15px;
      color: $primary_color;
    }

</style>