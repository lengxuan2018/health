import Vue from 'vue'
import Router from 'vue-router'
import enterHome from '../components/enterHome'
import bookingsIndex from '../components/myBookings/bookingsIndex'
import bookingsInfo from '../components/myBookings/bookingsChange'
import bookingProcess from '../components/bookingProcess/index'
import baseInfo from '../components/bookingProcess/children/baseInfo'
import timeChoice from '../components/bookingProcess/children/timeChoice'
import viewBooking from '../components/bookingProcess/children/viewBooking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'enterHome',
      component: enterHome
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
        title: '预约服务'
      },
      component: bookingProcess,
      redirect: '/baseInfo',
      children: [
        {
          path: '/baseInfo',
          name: 'baseInfo',
          meta: {
            title: '预约服务'
          },
          component: baseInfo
        },
        {
          path: '/timeChoice',
          name: 'timeChoice',
          meta: {
            title: '预约服务'
          },
          component: timeChoice
        },
        {
          path: '/viewBooking',
          name: 'viewBooking',
          meta: {
            title: '预约服务'
          },
          component: viewBooking
        }
      ]
    }
  ]
})
