import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'framework',
    component: () => import('@/Framework.vue'),
    children: [
      {
        path: '/',
        name: 'blog',
        meta: { title: '博客', activePath: '/' },
        component: () => import('@/views/index.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        meta: { title: '博客分类', activePath: '/categories' },
        component: () => import('@/views/category.vue')
      },
      {
        path: '/specials',
        name: 'special',
        meta: { title: '专题', activePath: '/specials' },
        component: () => import('@/views/special.vue')
      },
      {
        path: '/users',
        name: 'index',
        meta: { title: '成员', activePath: '/users' },
        component: () => import('@/views/users.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + '--' + '学习是一种信仰，写作是一种享受'
  next()
})

export const initRouter = (app: App) => {
  app.use(router)
}
