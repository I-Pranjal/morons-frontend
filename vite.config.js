import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
=======
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
>>>>>>> fa04c7a8704930eb94af4a80b9e239feb91d327d
