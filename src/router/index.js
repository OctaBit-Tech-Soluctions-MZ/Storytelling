import { createRouter, createWebHistory } from 'vue-router'

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
  {
    path: '/presentations/:id',
    name: 'presentation-editor',
    component: () => import('../views/presentation/PresentationEditorView.vue'),
  },
  {
    path: '/presentations/new',
    name: 'presentation-new',
    component: () => import('../views/presentation/PresentationEditorView.vue'),
  },
  {
    path: '/presentations/:id',
    name: 'presentation-editor',
    component: () => import('../views/presentation/PresentationEditorView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
