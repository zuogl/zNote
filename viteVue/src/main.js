import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "./router/index"
import { createPinia } from 'pinia'


const pi = createPinia()
const app = createApp(App)

app.use(pi).use(router).use(ElementPlus).mount('#app')
