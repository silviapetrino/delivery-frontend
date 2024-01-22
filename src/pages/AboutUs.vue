<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
  name: 'About Us',
  components:{
  },
  data() {
    return {
      store,
      selectedTypes: [],
      restaurants: [],
      isLoading: true,
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<template>
  <div class="container">
    <h1>About Us</h1>
  </div>

</template>


<style lang="scss" scoped>
@use '../scss/main.scss' as *;

</style>