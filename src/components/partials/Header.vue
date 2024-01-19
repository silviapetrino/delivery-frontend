<script>
import { store } from '../../data/store';
export default {
  name: 'header',
  data(){
    return{
      store,
    }
  },
  methods: {
    removeFromCart(index){
      store.cart.splice(index , 1);
      this.saveCart();
    },

    saveCart(){
      localStorage.setItem('cart', JSON.stringify(store.cart));
    }

  },
}
</script>

<template>

  <header class="">

    <div class="container d-flex justify-content-between align-items-center h-100">

      <nav class="d-flex align-items-center h-100">
        <div class="logo d-flex ">
          <img src="../../../img/logo.JPG" alt="">
          <h3 class=" d-none d-sm-block ">Deliveboo</h3>
        </div>
        <ul class="d-flex">
          <li>
             <router-link :to="{name: 'home'}">Home</router-link>
          </li>
          <li>
            <a href="#">Restaurants</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
        </ul>
      </nav>

      <div class="shop">

        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <i class="fa-solid fa-cart-shopping"></i>
        </button>

        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Cart Shopping</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="container" id="cart">
              <h1>il mio carrello!</h1>
              <ul>
                <li v-for="(product , index) in store.cart" :key="index">{{ console.log(product)}}
                {{ product.name }}<button @click="removeFromCart(index)" class="btn btn-danger">Removefrom cart</button></li>
              </ul>
            </div>
          </div>
        </div>
      
      </div>
    </div>

  </header>

</template>


<style lang="scss" scoped>
@use '../../scss/main.scss' as *;


header {
  height: 70px;
  background-color: $tertiary_color;
  color: $secondary_color;
  button i {
    color: $secondary_color;
    &:hover {
      color: $primary_color;
    }
  }
  router-link, a {
    color: $primary_color;
    &:hover {
      color: $secondary_color;
    }
  }
  
  .logo {
    h3 {
      font-weight: 700;
    }
    img {
      width: 40px;
      border-radius: 35%;
      margin: 0 5px 0 0;
    }
  }
}

li {
  margin: 0 10px 0 0;
}
</style>