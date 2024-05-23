import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Walk from './pages/Walk.vue'
import Another from './pages/Another.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/walk', name: 'Walk', component: Walk },
  { path: '/another', name: 'Another', component: Another }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
