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
      return totalPrice.toFixed(2);
    },

  },
}
</script>

<template>

<header>

<div class="container d-flex justify-content-between align-items-center h-100 debug">

  <nav class="d-flex align-items-center h-100">
    <div class="logo d-flex">
      <img src="/img/DeliveBoo-img.png" alt="logo">
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

    <div class="cart-container position-relative">
      <div v-if="store.cart.length > 0" class="cart-counter position-absolute d-flex justify-content-center align-items-center ">
        <span>{{ store.cart.length}}</span>
      </div>
      <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>

    <div class="offcanvas offcanvas-end offcanvas-custom" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasRightLabel">Cart Shopping</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="container" id="cart">
          <!-- <ul>
            <li v-for="(product , index) in store.cart" :key="index">
              <span>{{ product.quantity }}</span>
              <span>{{ product.name }}</span>
              <button @click="removeFromCart(index)" class="btn btn-danger">Removefrom cart</button>
              <button @click="() => decreaseQuantity(index)" class="btn btn-warning">-</button>
              <button @click="() => increaseQuantity(index)" class="btn btn-success">+</button>
            </li>
          </ul> -->
          
          <h5>Order Summary</h5>
          
          <table class="table table-custom">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product , index) in store.cart" :key="index">
                <th scope="row">{{ product.name }}</th>
                <td>
                  <button @click="() => decreaseQuantity(index)" class="btn-custom "><i class="fa-solid fa-minus"></i></button>
                  <span class="mx-1">{{ product.quantity }}</span>
                  <button @click="() => increaseQuantity(index)" class="btn-custom "><i class="fa-solid fa-plus"></i></button>
                </td>
                <td>{{ (product.price * product.quantity).toFixed(2) }} &euro;</td>
                <td>
                  <button @click="removeFromCart(index)" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
            </tbody>
          </table>

          <span class="d-block mb-2"><strong>Totale: </strong>{{ getTotalPrice() }} &euro;</span>
          <button class="btn btn-primary me-1">Go to payment <i class="fa-solid fa-credit-card"></i></button>
          <button @click="clearCart(product)" class="btn btn-danger">Clear cart</button>
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
width: 100%;
height: 70px;
background-color: $tertiary_color;
color: $secondary_color;
position: fixed;
top: 0;
z-index: 999;
button i {
font-size: 2rem;
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
}

.btn-custom {
  i {
    font-size: 0.9rem;
  }
  padding: 3px 6px;
  background-color: $tertiary_color;
  color: $secondary_color;
  border: none;
  border-radius: 15%;
  &:hover {
    color: $primary_color;
  }
}

.btn-danger i {
  font-size: 0.9rem;
}
.fa-credit-card {
  font-size: 0.7rem;
  color: $primary_color;
}
</style>