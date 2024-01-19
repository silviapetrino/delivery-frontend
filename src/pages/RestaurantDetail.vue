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
    }
  },

  components:{
    Loader,
  },

  methods: {
    getRestaurant(restaurant_id){
      axios.get(store.apiUrl + 'restaurants/restaurant-detail/' + restaurant_id).then(res=>{
        this.restaurant = res.data;

        //aggiungo dinamicamente una nuova proprietà tempQuantity all'oggetto "product".
        this.restaurant.products.forEach(product => {
          product.tempQuantity = 1;
        });
        this.isLoading = false;
      })
    },
     
    addToCart(product, quantity){
    

      //"ciclo" tutti i prodotti già nel carrello guardando se ne trovo uno che abbia l'id uguale al prodotto che sto cercando di aggiungere (se non ne trovo qui mi risulta UNDEFINED)
      let existingProduct = store.cart.find(productInCart => productInCart.id === product.id);
    
      //if di controllo per avere prodotti da un solo ristorante alla volta, il vero funzionamento del tutto è dopo l'else.

      if(store.cart.length > 0){
        if(product.restaurant_id !== store.cart[0].restaurant_id){
        alert('you can only add products from a single restaurant per order.')
        product.tempQuantity = 1;
        }else{
          //SE let existingProduct esiste: aggiungo alla quantità del prodotto nel carrello la quantity che passo come parametro in addToCart()
          if (existingProduct) {
            existingProduct.quantity += parseInt(quantity);
          } else {  //SE è undefined pusho il prodotto aggiungendo all'oggetto la proprietà "quantity" = quantità che passo come parametro nella function
            store.cart.push({ ...product, quantity: parseInt(quantity) });
          }
          /*  console.log(store.cart[0].restaurant_id); */
          this.saveCart(); 
          
          product.tempQuantity = 1;  //resetto la tempQuantity per scopi grafici nell'input DOPO aver salvato
        }
      }else{

        store.cart.push({ ...product, quantity: parseInt(quantity) });
        this.saveCart(); 
      }
      
    },
    
    removeFromCart(index){
      store.cart.splice(index , 1);
      this.saveCart();
    },
    clearCart() {
      store.cart = [];
      this.saveCart();
    },
    saveCart(){
      localStorage.setItem('cart', JSON.stringify(store.cart));
    }
    




  },
  created(){
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart){
      store.cart = cart;
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
          <div v-for="product in restaurant.products" :key="product.id">
    
            <div v-if="product.visibility == 1"  class="card" style="width: 18rem;">
          
              <img class="card-img-top" :src="product.image" alt="Card image cap">
              <div class="card-body">
                {{ product }}
                <h5 class="card-title">{{product.name}} </h5>
                <span>{{ product.price }} &euro; </span>
                <p class="card-text">{{product.description}}</p>
                <p>Ingredients: {{ product.ingredients }}</p>
                <input type="number" v-model.number="product.tempQuantity" min="1" class="form-control mb-2" placeholder="Quantity">
                <button @click="addToCart(product, product.tempQuantity)" class="btn btn-success">Add to cart</button>
                
              </div>
            </div>
          </div>
    
        </div>
      </div>
    </div>
    <button @click="clearCart(product)" class="btn btn-primary">clear cart</button>
</template>

<style lang="scss" scoped>
#cart{
  border: 1px solid black;
}
</style>