import { createRouter , createWebHistory } from "vue-router";

// const router = createRouter({
// history: createWebHistory(),
// customizzo la classe predefinita del router-link
// linkExactActiveClass : 'active',
// routes:[
//   {
//      path: '/',
//      name: 'home',
//      component: Home
//   },
//   {
//      path: '/chi-siamo',
//      name: 'about',
//      component: About
//   },
//   {
//      path: '/blog',
//      name: 'blog',
//      component: Blog
//   },
//   {
//      path: '/contatti',
//      name: 'contacts',
//      component: Contacts
//   },
//   {
//     // rotta con elemento dinamico come parametro (slug)
//      path: '/dettaglio-personaggio/:slug',
//      name: 'characterDetail',
//      component: CharacterDetail
//   },
//   {
//     // rotta con elemento dinamico come parametro (slug)
//      path: '/personaggi-race-skill/:slug/:type',
//      name: 'charactersRaceSkill',
//      component: CharactersRaceSkill
//   },

//    // rotta 404 da mettere come ultima rotta
//    {
//       path: '/:pathMatch(.*)*',
//       // il nome possiamo anche non metterlo
//       name: 'error404',
//       component: Error404
//    }
// ]
// });

// export {router}