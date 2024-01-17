<script>
import Header from './components/partials/Header.vue';

  export default {
    name: 'App',
    components: {
      Header
    },
    data(){
      return {
        
      }
    }
  
  }
</script>
<template>
  <Header />

  <div>
    
      <RouterView />
    
  </div>
  
</template>


<style lang="scss">

@use  'bootstrap/scss/bootstrap' as *;

</style>