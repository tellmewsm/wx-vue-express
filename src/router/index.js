import Vue from 'vue'
import Router from 'vue-router'
// eslint-disable-next-line
/* eslint-disable */
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/lab',
    component: Layout,
    redirect: '/lab/alarm1',
    name: 'abnormal',
    meta: { title: '异常告警', icon: 'table' },
    children: [
      {
        path: 'alarm1',
        name: 'Lab1',
        component: () => import('@/views/lab/device'),
        meta: { title: '设备监控', icon: 'table' }
      },
      {
        path: 'alarm2',
        name: 'Lab2',
        component: () => import('@/views/lab/deviceError'),
        meta: { title: '历史异常', icon: 'table' }
       }
      //,
      // {
      //   path: 'alarm4',
      //   name: 'Lab4',
      //   component: () => import('@/views/lab/battery'),
      //   meta: { title: '属性统计', icon: 'table' }
      // }
      // ,
      // {
      //   path: 'alarm3',
      //   name: 'Lab3',
      //   component: () => import('@/views/lab/deviceadd'),
      //   meta: { title: '账号管理', icon: 'table' }
      // }
    ]
  },

  {
    path: '/lab1',
    component: Layout,
    redirect: '/lab/abnormal',
    name: 'abnormal',
    meta: { title: '设备属性', icon: 'table' },
    children: [
      {
        path: 'alarm10',
        name: 'Lab10',
        component: () => import('@/views/battery/battery_device'),
        meta: { title: '机器监控', icon: 'table' }
      },
      {
        path: 'alarm11',
        name: 'Lab11',
        component: () => import('@/views/battery/battery'),// 记得增加搜索
        meta: { title: '属性历史', icon: 'table' }
      },
      {
        path: 'alarm12',
        name: 'Lab12',
        component: () => import('@/views/lab/deviceError'),
        meta: { title: '异常查看', icon: 'table' }
      },
      {
        path: 'alarm13',
        name: 'Lab13',
        component: () => import('@/views/battery/battery_range'),
        meta: { title: '属性设置', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
