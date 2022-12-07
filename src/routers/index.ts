import { createRouter, createWebHashHistory } from 'vue-router'
const constantRouter = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/App.vue'),
    children: [
      {
        path: 'dict',
        name: 'dictPage',
        component: () => import('@/pages/dict/index.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRouter]
})

export default router
