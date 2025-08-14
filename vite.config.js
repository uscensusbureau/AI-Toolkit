import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

console.log("process.env.BASE: ", process.env.BASE);
// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE,
  plugins: [
    react(),
    tailwindcss()
  ],
})
