<script>
import { store } from '../data/store';
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      store,
      selectedTypes: [],
      restaurants: []
    }
  },
  methods: {
    getApi() {
      const typesQueryParam = this.selectedTypes.map(type => `types[]=${type}`).join('&');
      axios.get(store.apiUrl + 'restaurants?' + typesQueryParam)
        .then(results => {
          this.restaurants = results.data;
        });
    },
    toggleType(typeName) {
      const index = this.selectedTypes.indexOf(typeName);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      } else {
        this.selectedTypes.push(typeName);
      }
      console.log(this.selectedTypes);
      this.getApi(); // Aggiorna i ristoranti ogni volta che cambiano i tipi selezionati
    },

    //funzione per prendere tutti i types (la usiamo per riempire l'array in store e stampare i badge)
    getTypes(){
      axios.get(store.apiUrl + 'types')
      .then(results =>{
        store.types = results.data;
        console.log(store.types);
      })
    }
  },
  mounted() {
    this.getApi(); // Carica inizialmente tutti i ristoranti
    this.getTypes();
  }
}
</script>

<template>

<h1>homepage</h1>
  <section class="container">
    <ul class="d-flex gap-2 flex-wrap justify-content-center list-unstyled">
      <li v-for="type in store.types" :key="type.id">
        {{ console.log(type) }}
        <button
           v-if="type.restaurants.length > 0"
          class="badge rounded-pill text-bg-primary"
          :class="{'active-type': selectedTypes.includes(type.name)}"
          @click="toggleType(type.name)"
        >
          {{ type.name }}
        </button>
      </li>
    </ul>
    <div v-if="restaurants.length">
      <p v-for="restaurant in restaurants" :key="restaurant.id">{{ restaurant.name }}</p>
    </div>
    <div v-else>
      <h1>There are no restaurants that are both: {{ selectedTypes.join(' and ') }}</h1>
    </div>
  </section>
</template>


<style lang="scss">
    .active-type{
      color: red !important;
    }
</style>