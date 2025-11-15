import axios from 'axios';

// Usamos la variable de entorno o fallback a localhost
const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Interceptor para agregar el token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

