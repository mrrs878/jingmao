import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import IconSvg from './components/IconSvg.vue'
import Menu from './components/Menu.vue'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

Vue.component('icon-svg', IconSvg)
Vue.component('side-menu', Menu)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
