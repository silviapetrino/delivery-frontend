<script>
import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';

export default {
  name: 'Home',
  data() {
    return {
      store,
      restaurant_id: '',
      restaurant: {},
      isLoading: true,
      message : {},
      showModal: false,
      error: false,
      showToast: {}, 
    }
  },

  components: {
    Loader,
  },

  methods: {
    getRestaurant(restaurant_id) {
      axios.get(store.apiUrl + 'restaurants/restaurant-detail/' + restaurant_id).then((res) => {
        this.restaurant = res.data;
        this.restaurant.products.forEach((product) => {
          product.tempQuantity = 1;
        });
        this.isLoading = false;
      });
    },

    addToCart(product, quantity) {
      if (store.cart.length >= 0) {
        this.showToast[product.id] = true;
        this.message[product.id] = `${quantity} ${product.name}`;
        product.tempQuantity = 1;
      }

      //"ciclo" tutti i prodotti già nel carrello guardando se ne trovo uno che abbia l'id uguale al prodotto che sto cercando di aggiungere (se non ne trovo qui mi risulta UNDEFINED)
      let existingProduct = store.cart.find(productInCart => productInCart.id === product.id);
    
      //if di controllo per avere prodotti da un solo ristorante alla volta, il vero funzionamento del tutto è dopo l'else.

      if(store.cart.length > 0){
        if(product.restaurant_id !== store.cart[0].restaurant_id){
        // alert('you can only add products from a single restaurant per order.')
        product.tempQuantity = 1;
        this.error = true;
        this.showModal = true;
        this.showToast[product.id] = false;
        return;
        }else{
          //SE let existingProduct esiste: aggiungo alla quantità del prodotto nel carrello la quantity che passo come parametro in addToCart()
          if (existingProduct) {
            existingProduct.quantity += parseInt(quantity);
          } else {
            store.cart.push({ ...product, quantity: parseInt(quantity) });
          }
          this.saveCart();
          product.tempQuantity = 1;
        }
      } else {
        store.cart.push({ ...product, quantity: parseInt(quantity) });
        this.saveCart();
      }
      setTimeout(() => {
        this.showToast[product.id] = false;
        this.message[product.id] = '';
        
      }, 3500);
    },

    decreaseQuantity(product){
      if(product.tempQuantity > 1){
      product.tempQuantity--;
      }
    },
    
    increaseQuantity(product){
        product.tempQuantity++;
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(store.cart));
    },
  },

  created() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      store.cart = cart;
    }
  },

  mounted() {
    this.restaurant_id = this.$route.params.id;
    this.getRestaurant(this.restaurant_id);
  },
};
</script>

<template>

  <!-- modal  -->
  <div v-if="this.error" class="container">
    <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showModal }">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="fs-4 fw-bold modal-title">We are sorry!</h5>
            <button type="button" class="close btn btn-danger" @click="showModal = false">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex flex-column justify-content-center align-items-center">
            <p class="fs-4 fw-bold">You can only add products from a single restaurant per order!</p>
            <div class="image w-50">
              <img class="w-100" src="/img/sorry-or-404.png" alt="error">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" @click="showModal = false">Close</button>
          </div>
        </div>
      </div> 
    </div>
  </div>
  <!-- /modal  -->

  <div  v-if="isLoading" class="loader-container">
    <Loader />
  </div>
  
  <div v-else >


    <div v-if="restaurant.products.length === 0">
      <h2>Sorry, no products available for this resaurant.</h2>
    </div>
    
    <div v-else>
      <!-- restaurant details  -->
      <div class="restaurant cover w-100">
        <img class="w-100 h-100" :src="restaurant.image" :alt="restaurant.name" >
        <div class="card text-center">
          <h1 class="mb-2">{{restaurant.name}}</h1>
          <ul class="d-flex justify-content-center align-content-center flex-wrap">
            <li v-for="type in restaurant.types" :key="type.id" class="badge-cs me-3 mb-2">
              {{ type.name }}
            </li>
          </ul>
          <span><i class="fa-solid fa-location-dot"></i> {{ restaurant.address }}</span>
        </div>
      </div>
      
      <!-- ///restaurant details  -->
      
      <div class="container restaurant details">

        <h2 class="text-center mb-5">Menu</h2>

        <div class="container d-flex flex-column flex-md-row flex-md-wrap justify-content-center align-items-center w-100">

          <div class="col-lg-6 d-flex justify-content-center align-items-center" v-for="product in restaurant.products" :key="product.id" >
            
            <div v-if="product.visibility == 1"  class="card cs-card flex-row p-3 mb-3" >
              <div class="info-product d-flex flex-column w-75">
                <h4 class="card-title">{{product.name}} </h4>
                <p>Ingredients: {{ product.ingredients }}</p> 
                <span>Price: {{ product.price }} &euro; </span>

              <div class="actions-and-toast d-flex gap-2 debug w-100 h-100">

                <div style="width: 140px;" class="h-100 actions d-flex flex-column my-3">
                  <div class="mb-1">
                    <button
                      @click="decreaseQuantity(product)"
                      class="btn btn-danger p-2 fw-bold rounded-1"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="mx-1 quantity " >{{ product.tempQuantity }}</span>
                    <button @click="increaseQuantity(product)" class="btn btn-success p-2 fw-bold rounded-1">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button @click="addToCart(product, product.tempQuantity)" class="add-product badge-cs p-2 fw-bold rounded-1">
                    Add to cart
                  </button>
                </div>

                    <!-- toast  -->
                <div style="width: 150px; " v-if="showToast[product.id]" class="toast-cs text-center d-flex align-items-center justify-content-center p-3" role="alert" aria-live="assertive" aria-atomic="true">
                  <div class="toast-body">
                      
                    <strong>
                      <span>You added {{ message[product.id] }} to cart</span>
                      <img class="w-100 h-100 object-fit-cover" src="/img/cart-2.png" alt="cart">
                    </strong>
                  </div>
                </div>
              <!-- /toast  -->
              </div>
                
              </div>
              <div class="image-container d-flex flex-column align-items-center">
                <img :src="product.image" alt="Card image cap">
              </div>
            </div>
          </div>
        </div>

      </div>
      
    </div>

  </div>
    
</template>

<style lang="scss" scoped>
@use '../scss/main.scss' as *;

.loader-container{
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  
}

#cart{
  border: 1px solid black;
}

//  modal 
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;

    &.show {
      display: block;
    }
  }
  .card.cs-card {
    width: 400px;
    height: 250px;
    padding: 5px;
    margin: 5px;
    box-shadow: 1px 3px 8px;
    color: $secondary_color;
    position: relative;
    .add-product {
      width: 100px;
    }
    @media all and (min-width: 576px){
      width: 450px;
    }
    @media all and (min-width: 782px){
      width: 800px;
    }
    @media all and (min-width: 1200px){
      width: 550px;
    }
    .image-container {
      width: 300px;
     
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .info{
      height: 70px;
      overflow-y:auto;
    }
  }


  //  /modal 


  .toast-cs {
    border: 3px solid $tertiary_color;
    background-color:  rgba($color: #F5EBDC, $alpha: .8);
    border-radius: 20px;
    -webkit-box-shadow: -13px 8px 16px -16px rgb(248, 6, 6);
    -moz-box-shadow:  -13px 8px 16px -16px rgba(120, 82, 17, 1);
    box-shadow:  -13px 8px 16px -16px rgb(247, 194, 21);
    position: absolute;
    top: 47%;
    left: 47%;
    transform: translate(-50%, -50%);
     .message-title{
      color:$secondary_color;
     }
     .message{
      color:$tertiary_color
     }
  }
 
     
  // toast 


  // restaurant cover 

  .restaurant.cover {
    height: 250px;
    position: relative;
    img {
      object-fit: cover;
    }
    .card {
      color: $secondary_color;
      box-shadow: 2px 4px 10px;
      width: 75%;
      padding: 10px;
      position: absolute;
      margin: 0 auto;
      top: 250px;
      left: 50%;
      transform: translate(-50%,  -50%);
    }
  }

  @media all and (min-width: 992px ){
    .restaurant.cover {
    height: 350px;
      .card {
        width: 50%;
        top: 350px;
      }
  }
}

 // restaurant details
 .restaurant.details {
   padding-top: 100px;
  }


  .badge-cs {
      background-color: $secondary_color;
      padding: 2px 10px;
      border-radius: 15px;
      color: $primary_color;
    }
  .quantity{
    width:30px;
    display: inline-block;
    text-align: center;
  }



</style>