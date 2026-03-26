import { createRouter, createWebHistory } from 'vue-router'

<<<<<<< HEAD
import IndexView from '../views/public/IndexView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignUpView from '../views/auth/SignUpView.vue'
import HomeView from '../views/dashboard/HomeView.vue'
import PresentationListView from '../views/presentation/PresentationListView.vue'
import CreatePresentationView from '../views/presentation/CreatePresentationView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/presentations',
    name: 'presentations',
    component: PresentationListView,
  },
  {
    path: '/presentations/create',
    name: 'create-presentation',
    component: CreatePresentationView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
=======
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
>>>>>>> fb95c9017613c5db98f551923c285a49fe71957c
})

export default router