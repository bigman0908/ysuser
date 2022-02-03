import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Main from '../views/main/main.vue'
import About from '../views/about/about.vue'
import Education from '../views/education/education.vue'
import Exam from '../views/exam/exam.vue'
import GalleryList from '../views/gallery/galleryList.vue'
import GalleryView from '../views/gallery/galleryView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },  
  {
    path: '/about',
    name: 'About',
    component: About
  },  
  {
    path: '/education',
    name: 'education',
    component: Education
  },
  {
    path: '/exam',
    name: 'exam',
    component: Exam
  },
  {
    path: '/gallery',
    name: 'galleryList',
    component: GalleryList
  },
  {
    path: '/galleryView',
    name: 'galleryView',
    component: GalleryView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router