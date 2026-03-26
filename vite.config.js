<<<<<<< HEAD
import { fileURLToPath, URL } from 'node:url'
=======
>>>>>>> fb95c9017613c5db98f551923c285a49fe71957c
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
<<<<<<< HEAD
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
=======
>>>>>>> fb95c9017613c5db98f551923c285a49fe71957c
})