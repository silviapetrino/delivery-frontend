<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
  name: 'Home',
  data(){
    return {
      store
    }
  },
  methods:{
    getApi(){
      axios.get(store.apiUrl + 'types')
        .then(results => {
          console.log(results.data);
          store.types = results.data;
        }
      )
    }
  },
  mounted(){
    this.getApi()
  },
 

}
</script>

<template>

  <h1>homepage</h1>
  <section class="container">
    <ul class="d-flex gap-2 flex-wrap justify-content-center list-unstyled">
      <li v-for="type in store.types" :key="type.id">
        <button class="badge rounded-pill text-bg-primary">{{ type.name }}</button>
      </li>
    </ul>
  </section>

  
</template>


<style lang="scss">

</style>