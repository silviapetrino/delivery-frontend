<template>
  <div v-if="isLoading" class="d-flex justify-content-center pt-5">
    <Loader />
  </div>

  <div v-else>
    <div v-if="restaurant.products.length === 0">
      <h2>Sorry, no products available for this restaurant.</h2>
    </div>

    <div v-else>
      <h1 class="text-center mb-5">{{ restaurant.name }}</h1>
      <div class="d-flex gap-5 flex-wrap justify-content-center">
        <div v-for="product in restaurant.products" :key="product.id">
          <div v-if="product.visibility == 1" class="card" style="width: 18rem;">
            <img class="card-img-top p-5" :src="product.image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }} </h5>
              <span>{{ product.price }} &euro; </span>
              <p class="card-text">{{ product.description }}</p>
              <p>Ingredients: {{ product.ingredients }}</p>
              <div class="actions d-flex justify-content-center mb-2 rounded-3">
                <button
                  @click="removeFromCart(product, product.tempQuantity)"
                  :class="{ 'btn btn-danger p-2 fw-bold rounded-0': isInCart(product), 'btn btn-secondary p-2 fw-bold rounded-0': !isInCart(product) }"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  v-model.number="product.tempQuantity"
                  min="1"
                  class="form-control p-2 rounded-0"
                  placeholder="Quantity"
                  style="width:60px;"
                />
                <button @click="addToCart(product, product.tempQuantity)" class="btn btn-success p-2 fw-bold rounded-0">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="message">
                <span>{{ message[product.id] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
      message: {},
    };
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
        this.message[product.id] = `You added ${quantity} ${product.name} to the cart!`;
      }
      let existingProduct = store.cart.find((productInCart) => productInCart.id === product.id);
      if (store.cart.length > 0) {
        if (product.restaurant_id !== store.cart[0].restaurant_id) {
          alert('you can only add products from a single restaurant per order.');
          product.tempQuantity = 1;
        } else {
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
        this.message[product.id] = '';
      }, 3500);
    },

    removeFromCart(product, quantity) {
      if (this.isInCart(product)) {
        const existingProductIndex = store.cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex !== -1) {
          const existingProduct = store.cart[existingProductIndex];
          if (existingProduct.quantity > quantity) {
            existingProduct.quantity -= quantity;
            this.message[product.id] = `You removed ${quantity} ${product.name} from the cart!`;
          } else {
            store.cart.splice(existingProductIndex, 1);
            this.message[product.id] = `You removed all the ${product.name} from the cart!`;
          }
          this.saveCart();
        }
        setTimeout(() => {
          this.message[product.id] = '';
        }, 3500);
      }
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(store.cart));
    },

    isInCart(product) {
      return store.cart.some((item) => item.id === product.id);
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

<style lang="scss" scoped>
#cart{
  border: 1px solid black;
}
.message{
  color: red;
}
</style>