import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router"
import api from './api'

import "@/router/interceper"

//使用i18n,双语
import i18n from '@/i18n'


const app = createApp(App)
const pinia = createPinia()
app.provide('$api',api)
// app.config.globalProperties.$api = api
app.use(pinia)
   .use(router)
   .use(i18n)
   .mount('#app')
