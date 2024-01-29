<script>
import HeaderComponent from './components/partials/HeaderComponent.vue';
import FooterComponent from './components/partials/FooterComponent.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      FooterComponent,
    },
    data(){
      return {
        
      }
    }
  
  }
</script>
<template>
  <HeaderComponent />
  <div class="page">
    
      <RouterView />
    
  </div>
  <FooterComponent />
</template>


<style lang="scss">

@use  'bootstrap/scss/bootstrap' as *;
@use 'scss/main.scss' as *;

body {
  background-color: $primary_color;
  color: $secondary_color;
  font-family: 'Kreon Variable', sans-serif;
  .page{
    padding-top: 70px ;
  }
}

</style>