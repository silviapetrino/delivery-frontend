<script>
import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';
import Jumbotron from '../components/partials/Jumbotron.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { Pagination } from 'swiper/modules';

export default {
  name: 'home',
  components:{
    Loader,
    Jumbotron,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      store,
      selectedTypes: [],
      isLoading: true,
      modules: [Pagination, Navigation],
    }
  },
  methods: {
    getApi() {
      const typesQueryParam = this.selectedTypes.map(type => `types[]=${type}`).join('&');
      axios.get(store.apiUrl + 'restaurants?' + typesQueryParam)
        .then(results => {
          store.restaurants = results.data;
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
      .then(results => {
        store.types = results.data.filter(type => type.restaurants.length > 0);
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

  <section id="search-restaurant">
    <div class="text-center">
      <h2>What do you want to eat today?</h2>
      <p>Select the type of restaurant to filter your search</p>
    </div>
    <!-- slidex xl -->
    <div class="d-flex flex-wrap justify-content-center">
      <swiper
      ref="{swiperRef}"
      :slidesPerView="13"
      :spaceBetween="30"
      :navigation="true"
      :modules="modules"
      class="mySwiper d-none d-xl-block"
      >

        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
      </swiper>
    </div>



    <div class="d-flex flex-wrap justify-content-center">
      <swiper
        ref="{swiperRef}"
        :slidesPerView="4.5"
        :spaceBetween="10"
        :navigation="true"
        :modules="modules"
        class="mySwiper d-md-none"
      >
        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
      </swiper>
    </div>
    

    <div class="d-flex flex-wrap justify-content-center">
      <swiper
        ref="{swiperRef}"
        :slidesPerView="7.5"
        :spaceBetween="10"
        :navigation="true"
        :modules="modules"
        class="mySwiper d-none d-md-block d-xl-none "
      >
        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
      </swiper>

    </div>


    <div  v-if="isLoading" class="d-flex justify-content-center pt-5">
      <Loader />
    </div>
    
    <div v-else>
          <div class="mt-3 container d-flex flex-column flex-md-row flex-md-wrap justify-content-center align-items-center gap-2 text-center w-100" v-if="store.restaurants.length">
              <h2 v-if="selectedTypes.length > 0">Restaurants found : {{ store.restaurants.length }}</h2>
          
                  <div v-for="restaurant in store.restaurants" :key="restaurant.id">

                    <router-link class="text-dark text-decoration-none" :to="{ name: 'restaurantDetail', params: { id: restaurant.id } }">

                      <div style="width: 250px;" class=" card p-1">
                        <h3>{{ restaurant.name }}</h3>
                        <img class="w-100 h-100" :src="restaurant.image">
                      </div>

                      
                    </router-link>

                  </div>
              

            </div>
          
            <div v-else>
                <h3>There are no restaurants for these tipologies: {{ selectedTypes.join(', ') }}</h3>
            </div>

    </div>
    
  
  
  </section>
</template>


<style lang="scss" scoped>
@use '../scss/main.scss' as *;

h2 {
    font-weight: 700;
  }

.type {
  width: 90px;
  background: none;
  border: 0;
  button {
    border: 0;
    background-color: none;
  }
  .image{
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: .2s all ease;
      &:hover {
        border: 3px solid $primary_color;
        scale: 1.07;
      }
    }
  }

}

@media all and (min-width: 576px){
  .type {
    width: 110px;
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