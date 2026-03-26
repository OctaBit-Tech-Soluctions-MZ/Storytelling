import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
=======

>>>>>>> fb95c9017613c5db98f551923c285a49fe71957c
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')