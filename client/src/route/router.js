import Vue from 'vue'
import Router from 'vue-router'

import indexRouter from './indexRouter'
import bookRouter from './bookRouter'
import userRouter from './userRouter'
import commentRouter from './commentRouter'
import secKillRouter from './secKillRouter'

const INTERCEPTOR = ['index', 'signup']

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    ...indexRouter,
    ...bookRouter,
    ...userRouter,
    ...commentRouter,
    ...secKillRouter
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (!localStorage.token && !INTERCEPTOR.includes(to.name)) {
    router.app.$message({
      message: '警告哦，请先登录',
      type: 'warning',
      duration: '1500'
    })
    router.push('/')
  }
  next()
})

export default router
