<script>
export default {
  name: 'Jumbotron',
}
</script>
<template>
  <div class="jumbotron text-center m-3">
      <h2>What do you want to eat today?</h2>
      <p>Select the type of restaurant to filter your search</p>
  </div>
  
  
</template>


<style lang="scss">
@use '../../scss/main.scss' as *;

.jumbotron {
  padding: 80px 0 0 0;
  h2 {
    font-weight: 700;
  }
}

</style>