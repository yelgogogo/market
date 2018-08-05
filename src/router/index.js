import Vue from 'vue'
import Router from 'vue-router'
import hall from '@/view/hall'
import sell from '@/view/sell'
import mail from '@/view/mail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hall',
      component: hall
    },
    {
      path: '/mail',
      name: 'mail',
      component: mail
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    }
  ]
})
