import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'https://spa-1306502097.cos.ap-guangzhou.myqcloud.com/',
  plugins: [vue()]
})
