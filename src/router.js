import { createRouter , createWebHistory } from "vue-router";
import { store } from './data/store';
import Home from './pages/Home.vue';
import Restaurants from './pages/Restaurants.vue'
import Error404 from './pages/Error404.vue';
import RestaurantDetail from './pages/RestaurantDetail.vue';
import AboutUs from './pages/AboutUs.vue';
import Checkout from './pages/Checkout.vue';

const router = createRouter({
history: createWebHistory(),
// customizzo la classe predefinita del router-link
linkExactActiveClass : 'active',
routes:[
   {
      path: '/',
      name: 'home',
      component: Home
   },
   {
      path: '/Restaurants',
      name: 'restaurants',
      component: Restaurants
   },
   {
      path: '/AboutUs',
      name: 'aboutUs',
      component: AboutUs
   },

   {
      path: '/restaurant-detail/:id',
      name: 'restaurantDetail',
      component: RestaurantDetail,
   },

  {
   path: '/checkout',
   name: 'checkout',
   component: Checkout,
   beforeEnter: (to, from, next) => {
      if (store.cart.length === 0) {
        next({ name: 'home' });
      } else {
        next();
      }
    },
   
  },
   // rotta 404 da mettere come ultima rotta
   {
      path: '/:pathMatch(.*)*',
      // il nome possiamo anche non metterlo
      name: 'error404',
      component: Error404
   }
]
});

export {router}