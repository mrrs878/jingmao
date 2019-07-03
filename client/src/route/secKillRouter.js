import SecKill from '../views/secKill/SecKill.vue'
import AddSecKill from '../views/secKill/AddSecKill.vue'

export default [
  {
    path: '/secKill',
    name: 'secKillShops',
    component: SecKill
  },
  {
    path: '/secKill/add',
    name: 'addSecKill',
    component: AddSecKill
  }
]
