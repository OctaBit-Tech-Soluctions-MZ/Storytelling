import { defineStore } from 'pinia';
import api from '../services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    actions: {
        async fetchUser() {
            if (!this.token) return;
            const res = await api.get('/profile', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.user = res.data.user;
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        }
    }
});
