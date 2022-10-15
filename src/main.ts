import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router"

import "@/router/interceper"

//使用i18n,双语
import i18n from '@/i18n'

const app = createApp(App)
const pinia = createPinia()
// app.config.globalProperties.$api = 
app.use(pinia)
   .use(router)
   .use(i18n)
   .mount('#app')
