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
        meta: {
          title: '博客',
          activePath: '/',
          keepAlive: true,
          cacheList: ['blogList']
        },
        component: () => import('@/views/Blog.vue')
      },
      {
        path: '/blog/:blogId',
        name: 'blogDetail',
        meta: { title: '博客详情', activePath: '/', keepAlive: false },
        component: () => import('@/views/BlogDetail.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        meta: {
          title: '博客分类',
          activePath: '/categories',
          keepAlive: false
        },
        component: () => import('@/views/Category.vue')
      },
      {
        path: '/categories/:categoryId:',
        name: 'categoryDetail',
        meta: {
          title: '分类详情',
          activePath: '/categories',
          keepAlive: false
        },
        component: () => import('@/views/CategoryDetail.vue')
      },
      {
        path: '/specials',
        name: 'special',
        meta: {
          title: '专题',
          activePath: '/specials',
          keepAlive: true,
          cacheList: ['specialList']
        },
        component: () => import('@/views/Special.vue')
      },
      {
        path: '/specials/:specialId',
        name: 'specialDetial',
        meta: { title: '专题详情', activePath: '/specials', keepAlive: false },
        component: () => import('@/views/SpecialDetail.vue')
      },
      {
        path: '/users',
        name: 'index',
        meta: { title: '成员', activePath: '/users', keepAlive: false },
        component: () => import('@/views/Users.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + '--' + '学习是一种信仰'
  next()
})

export const initRouter = (app: App) => {
  app.use(router)
}
