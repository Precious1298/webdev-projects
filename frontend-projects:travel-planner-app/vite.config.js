import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://test.api.amadeus.com', // Target API URL
        changeOrigin: true, // Adjusts the origin of the request (helps with CORS)
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite the URL if needed
      },
    },
  },
});