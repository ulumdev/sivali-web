import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      '/api': {
        target: 'http://31.57.224.30:8000',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
