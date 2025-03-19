import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'

const pinia = createPinia()

createApp(App).use(router).use(autoAnimatePlugin).use(pinia).mount('#app')
