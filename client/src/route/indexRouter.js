import Index from '../views/index/Index.vue'
import Signup from '../views/index/Signup.vue'
import Home from '../views/index/Home.vue'

export default [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '/signin',
    redirect: '/'
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]
