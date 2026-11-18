import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// CORS решается обратным прокси dev-сервера: SPA обращается к своему origin (localhost:3000),
// а Vite пересылает запросы веб-сервису FastAPI и хранилищу MinIO (S3).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // AJAX-запросы к веб-сервису
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // второй маршрут — изображения и видео из MinIO (S3)
      '/minio': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/minio/, ''),
      },
    },
  },
})
