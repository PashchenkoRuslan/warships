import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'

createApp(App).use(router).use(autoAnimatePlugin).mount('#app')
