import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/web': {
        target: 'https://www.gdlibrary.or.kr',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
