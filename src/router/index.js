// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment }
      ]
    },
    // ... 很多规则
    { name: '404', path: '*', component: NotFound }
  ]
})

// 加上前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hm74-toutiao')
  if (user) return next()
  next('/login')
})

export default router
