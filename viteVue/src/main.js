import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import '@/styles/element-plus.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from "./router/index"
import { createPinia } from 'pinia'


const pi = createPinia()
const app = createApp(App)

app.use(pi).use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

