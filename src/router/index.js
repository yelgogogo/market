import Vue from 'vue'
import Router from 'vue-router'
import hall from '@/view/hall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hall',
      component: hall
    }
  ]
})
