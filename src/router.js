import { createRouter , createWebHistory } from "vue-router";

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