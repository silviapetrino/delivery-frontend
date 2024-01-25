<script>
import { store } from '../data/store.js';
export default {
  name: 'order-success',
 
  data(){
    return{
      store,
      showImage: false
    }
  },
  mounted(){

    setTimeout(() =>{
      this.showImage = true;
    }, 500)
  }
}
</script>

<template>

    <div class="container my-5 content d-flex flex-column align-items-center">
      <h2><strong>{{ this.store.tempCustomerName }}, thank You for Your Order!</strong></h2>

      <div class="text">
        <p>
          Thank you so much for choosing <strong class="text-danger">{{ this.store.tempRestaurantName }}</strong>. We're excited to confirm that your order has been received and is progressing as expected.<br />
        </p>
        
          <h3 class="text-center"><strong>Please Check Your Email!</strong></h3>
          <p>
            We've also sent a confirmation of your order and a summary to <strong class="text-danger">{{ this.store.tempCustomerEmail }}</strong>. Please check your inbox and, if necessary, your spam folder to ensure you have all the details.
      
          </p>
         
      </div>
      
      <img v-if="showImage" class="w-25" src="/img/order-success.png" alt="order success">
    

    </div>
    

</template>

<style>

</style>