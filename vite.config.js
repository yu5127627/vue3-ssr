import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  base: '/',
  plugins: [
    vuePlugin(),
    vueJsx(),
  ],
  build: {
    minify: false
  },
})