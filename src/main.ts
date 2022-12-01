import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import type { App as AppInterFace } from 'vue'
const app = createApp(App)

function bootstrap(app: AppInterFace<Element>) {
  // 添加状态管理
  app.use(createPinia())
}

bootstrap(app)

app.mount('#app')
