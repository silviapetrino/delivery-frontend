<script>
import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';

export default {
  name: 'Home',
  components:{
   Loader
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
    getApi() {
      const typesQueryParam = this.selectedTypes.map(type => `types[]=${type}`).join('&');
      axios.get(store.apiUrl + 'restaurants?' + typesQueryParam)
        .then(results => {
          this.restaurants = results.data;
          this.isLoading = false;
        });
    },
    toggleType(typeName) {
      const index = this.selectedTypes.indexOf(typeName);
      this.isLoading = true;
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      } else {
        this.selectedTypes.push(typeName);
      }
     
      this.getApi(); // Aggiorna i ristoranti ogni volta che cambiano i tipi selezionati
    },

    //funzione per prendere tutti i types (la usiamo per riempire l'array in store e stampare i badge)
    getTypes(){
      axios.get(store.apiUrl + 'types')
      .then(results =>{
        store.types = results.data;
       
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

<!-- <h1>homepage</h1> -->
  <section class="container">
    
    <ul class="d-flex gap-2 flex-wrap justify-content-center list-unstyled">
      <li v-for="type in store.types" :key="type.id">
        <button
           v-if="type.restaurants.length > 0"
          class="badge rounded-pill"
          :class="{'active-type': selectedTypes.includes(type.name)}"
          @click="toggleType(type.name)"
        >
          {{ type.name }}
        </button>
      </li>
    </ul>
    <div  v-if="isLoading" class="d-flex justify-content-center pt-5">
       <Loader />
    </div>
    
    <div v-else>
          <div v-if="restaurants.length">
              <h2 v-if="selectedTypes.length > 0"> Restaurants found : {{ restaurants.length }}</h2>
          
                  <div v-for="restaurant in restaurants" :key="restaurant.id">
                    <router-link class="text-dark text-decoration-none" :to="{ name: 'restaurantDetail', params: { id: restaurant.id } }">{{ restaurant.name }}</router-link>

                  </div>
              
      
            </div>
          
            <div v-else>
                <h1>There are no restaurants for these tipologies: {{ selectedTypes.join(', ') }}</h1>
            </div>

    </div>
    
  
  
  </section>
</template>


<style lang="scss" scoped>
@use '../scss/main.scss' as *;

li button {
  background-color: $secondary_color !important;
  color: $primary_color;
}

.active-type{
  
  background-color: $detail_color !important;
}

</style>