import Vue from 'vue'
import Router from 'vue-router'
import Liuyan from '@/components/liuyan'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Liuyan',
      component: Liuyan
    }
  ]
})
