import Vue from 'vue'
import Router from 'vue-router'
import Devices from '@/components/device'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Devices',
      component: Devices
    }
  ]
})
