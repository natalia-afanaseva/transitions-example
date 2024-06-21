import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        { path: '/', component: HomeView },
        { path: '/about', component: () => import('../views/AboutView.vue') }
      ]
    }
  ]
})

export default router
