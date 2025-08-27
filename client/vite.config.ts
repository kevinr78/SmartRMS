import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import path from 'path'
// https://vite.dev/config/

export default defineConfig({
  plugins: [vue(),tailwindcss()],
  resolve: {
    alias: {
      //@ts-ignore
      "@": path.resolve(path.resolve(__dirname, "src"))
    }
  }
})
