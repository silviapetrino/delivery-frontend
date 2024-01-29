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
    <div class="text-center my-4">
      <h2>What do you want to eat today?</h2>
      <p>Select the type of restaurant to filter your search</p>
    </div>
    <!-- slidex xl -->
    <div class="d-flex flex-wrap justify-content-center">
      <swiper
      ref="{swiperRef}"
      :slidesPerView="12"
      :spaceBetween="25"
      :navigation="true"
      :modules="modules"
      class="mySwiper d-none d-xl-block"
      >
        <swiper-slide></swiper-slide>
        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type gap-1" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>



    <div class="d-flex flex-wrap justify-content-center mx-1">
      <swiper
        ref="{swiperRef}"
        :slidesPerView="5.5"
        :spaceBetween="10"
        :navigation="true"
        :modules="modules"
        class="mySwiper d-md-none"
      >
        <swiper-slide></swiper-slide>
        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
        <swiper-slide></swiper-slide>
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
        <swiper-slide></swiper-slide>
        <swiper-slide v-for="type in store.types" :key="type.id">
          <button v-if="type.restaurants.length > 0" class="d-flex flex-column align-items-center type" :class="{'active-type': selectedTypes.includes(type.name)}" @click="toggleType(type.name)">
            <img class="image" :src="type.image" alt="{{ type.name }}">
            <span>{{ type.name }}</span>  
          </button>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>

    </div>


    <div  v-if="isLoading" class="d-flex justify-content-center pt-5">
      <Loader />
    </div>
    
    <div v-else>
      <h2 class="my-2 p-3" v-if="selectedTypes.length > 0">Restaurants found : {{ store.restaurants.length }}</h2>
          <div class="mt-3 container " v-if="store.restaurants.length">
              <div class="d-flex flex-column flex-md-row flex-md-wrap justify-content-center align-items-center gap-3">
          
                  <div v-for="restaurant in store.restaurants" :key="restaurant.id" class="">

                    <router-link class="card text-white text-decoration-none" :to="{ name: 'restaurantDetail', params: { id: restaurant.id } }">

                      <div class=" p-2 m-2 overflow-hidden">
                        <h3>{{ restaurant.name }}</h3>
                        <img class="w-100 h-100 object-fit-cover" :src="restaurant.image">
                      </div>

                      
                    </router-link>

                  </div>
              </div>

            </div>
          
            <div v-else>
                <h3 class="ps-3">There are no restaurants for these tipologies: {{ selectedTypes.join(', ') }}</h3>
            </div>

    </div>
    
  
  
  </section>
</template>


<style lang="scss" scoped>
@use '../scss/main.scss' as *;

h2 {
    font-weight: 700;
  }
.type.active-type .image {
  filter: grayscale(60%);
}
.type {
  width: 90px;
  background: none;
  border: 0;
  button {
    padding-top: 20px;
    border: 0;
    background-color: none;
  }
  .image{
    margin-top: 5px;
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
      scale: 1.05;
      -webkit-box-shadow: -13px 8px 16px -16px rgb(248, 6, 6);
      -moz-box-shadow:  -13px 8px 16px -16px rgba(120, 82, 17, 1);
      box-shadow:  -13px 8px 16px -16px rgba(120, 82, 17, 1);
      }
    img {
      width: 199%;
      height: 100%;
      object-fit: cover;
      transition: .2s all ease;
    }
  }

}
// .card{
//   width:250px;
//   height:300px;
// }

@media all and (min-width: 576px){
  .type {
    width: 110px;
  }
}


.active-type{ 
  img {
    border: 4px solid $detail_color;
    
  }
  span {
    font-weight: 600;
  }
}


// card 

.card {
  border-radius: 10px;
  filter: drop-shadow(0 5px 10px 0 #ffffff);
  width: 400px;
  height: 220px;
  background-color: $secondary_color;
  padding: 20px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  transition: 1s ease-in;
}

.card::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: -15px;
  right: -15px;
  background: $tertiary_color;
  height:250px;
  width: 25px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform .3s ease-out;
}

.card:hover::before{
    transition-delay:0.2s ;

  transform: scale(40);
}

.card:hover{
    color: #ffffff;

}

.card p{
    padding: 10px 0;
}
</style>