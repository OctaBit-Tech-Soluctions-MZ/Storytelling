import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: IndexView },
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignUpView },
    { path: '/home', component: HomeView },
  ]
})

export default router