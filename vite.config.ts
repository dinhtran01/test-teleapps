import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '1458bcce36bf.ngrok-free.app',
      // Thêm pattern để cho phép tất cả các subdomain của ngrok-free.app
      '.ngrok-free.app',
      '.ngrok.io'
    ]
  }
})
