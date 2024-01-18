<script>
import Header from './components/partials/Header.vue';
import Jumbotron from './components/partials/Jumbotron.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Jumbotron
    },
    data(){
      return {
        
      }
    }
  
  }
</script>
<template>
  <Header />
  <Jumbotron />
  <div>
    
      <RouterView />
    
  </div>
  
</template>


<style lang="scss">

@use  'bootstrap/scss/bootstrap' as *;
@use 'scss/main.scss' as *;

body {
  background-color: $primary_color;
  color: $secondary_color;
}

</style>