import Vue from 'vue'
import Router from 'vue-router'
import hall from '@/view/hall'
import sell from '@/view/sell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hall',
      component: hall
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    }
  ]
})
