import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Change to your desired hostname
    port: 5173, // Optional: specify a port as well
    proxy: {
      '/resbellavista': 'http://localhost:5173'
    }
  }
})
