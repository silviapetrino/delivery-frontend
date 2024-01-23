<script>
import HeaderComponent from './components/partials/HeaderComponent.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
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