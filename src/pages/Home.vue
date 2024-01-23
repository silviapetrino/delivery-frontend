<script>
import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';
import Jumbotron from '../components/partials/Jumbotron.vue';

export default {
  name: 'home',
  components:{
   Loader,
   Jumbotron
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
  
    <Jumbotron />

<!-- <h1>homepage</h1> -->
  <section class="container">
    
    <div class="d-flex flex-wrap justify-content-center">
      <div v-for="type in store.types" :key="type.id">
        <button v-if="type.restaurants.length > 0"
          class="d-flex flex-column align-items-center type"
          :class="{'active-type': selectedTypes.includes(type.name)}"
          @click="toggleType(type.name)"
        >
          <img class="image" :src="type.image" alt="{{ type.name }}">
          <span>{{ type.name }}</span>  
        </button>
      </div>
    </div>

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


.type {
  width: 130px;
  background: none;
  border: 0;
  
  button {
    border: 0;
    background-color: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: .2s all ease;
    &:hover {
      border: 3px solid $secondary_color;
      scale: 1.07;
    }
  }
}


.active-type{ 
  img {
    border: 3px solid $secondary_color;
  }
  span {
    font-weight: 600;
  }
}

</style>