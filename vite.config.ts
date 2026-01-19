import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✅ IMPORTANT: This must match your repository name exactly!
  base: "/Birthday_to_My_Moon/", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})