import axios from 'axios'
import { Api } from './Api'

// Экземпляр сгенерированного клиента. baseURL пустой: запросы идут на тот же origin
// (http://localhost:3000/api/...), а Vite проксирует их на FastAPI — без CORS.
export const api = new Api({
  baseURL: '',
  withCredentials: true,
})

// Для авторизации/деавторизации — только axios, без кодогенерации и thunk.
export const authClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
