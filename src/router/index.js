import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Main from '../views/main/main.vue'
import About from '../views/about/about.vue'

const routes = [
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router