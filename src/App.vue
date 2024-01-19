<script>
import Header from './components/partials/Header.vue';

  export default {
    name: 'App',
    components: {
      Header,
    },
    data(){
      return {
        
      }
    }
  
  }
</script>
<template>
  <Header />
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
  .page{
    padding-top: 70px ;
  }
}

</style>