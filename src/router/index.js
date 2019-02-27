import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import bookingsIndex from '../components/myBookings/bookingsIndex'
import bookingsInfo from '../components/myBookings/bookingsChange'
import bookingProcess from '../components/bookingProcess/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bookings',
      name: 'bookings',
      meta: {
        title: '我的预约'
      },
      component: bookingsIndex
    },
    {
      path: '/bookingsRefund',
      name: 'bookingsRefund',
      meta: {
        title: '退款服务'
      },
      component: bookingsInfo
    },
    {
      path: '/bookingsEndorse',
      name: 'bookingsEndorse',
      meta: {
        title: '申请改签'
      },
      component: bookingsInfo
    },
    {
      path: '/bookingProcess',
      name: 'bookingProcess',
      meta: {
        title: '申请改签'
      },
      component: bookingProcess
    }
  ]
})
