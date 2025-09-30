import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': 'http://localhost:5505',
      '/create': 'http://localhost:5505',
      '/update': 'http://localhost:5505',
      '/delete': 'http://localhost:5505',
    }
  }
})
