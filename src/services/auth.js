import api from './api';
import socket from './socket';

export async function register(data) {
  const response = await api.post('/signup', data)
  return response.data
}

export async function login(data) {
  const response = await api.post('/login', data)

  const token = response.data.token

  localStorage.setItem('token', token)
  socket.auth = { token }
  socket.connect()

  return response.data
}