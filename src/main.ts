import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import type { App as AppInterFace } from 'vue'
import { baseConfig } from '@/config/base'
import { useInit } from './hooks/useInit'

const app = createApp(App)

function bootstrap(app: AppInterFace<Element>) {
  useInit(baseConfig)
  // 添加状态管理
  app.use(createPinia())
}

bootstrap(app)

app.mount('#app')
