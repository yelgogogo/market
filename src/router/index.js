import Vue from 'vue'
import Router from 'vue-router'
import hall from '@/view/hall'
import sell from '@/view/sell'
import mail from '@/view/mail'
import type from '@/view/type'
import detail from '@/view/detail'
import auction from '@/view/auction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hall',
      component: hall
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/auction',
      name: 'auction',
      component: auction
    },
    {
      path: '/type',
      name: 'type',
      component: type
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
