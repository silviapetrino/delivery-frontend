import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min';
createApp(App).use(router).mount('#app')
