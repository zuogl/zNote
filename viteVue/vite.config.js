import { defineConfig } from 'vite'
import { resolve } from 'path' // path是内置模块，不需要安装
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  // 配置@依赖符
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
    extensions: ['.js', '.json']
  }
})
