import Vue from 'vue'
import Router from 'vue-router'
import enterHome from '../components/enterHome'
import bookingsIndex from '../components/myBookings/bookingsIndex'
import bookingChange from '../components/myBookings/bookingsChange'
import bookingProcess from '../components/bookingProcess/index'
import baseInfo from '../components/bookingProcess/children/baseInfo'
import timeChoice from '../components/bookingProcess/children/timeChoice'
import viewBooking from '../components/bookingProcess/children/viewBooking'
import success from '../components/bookingProcess/children/success'
import telLogin from '../components/telLogin/telLogin'
import refundSuccess from '../components/refundSuccess/refundSuccess'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'home',
      redirect: 'baseInfo'
    },*/
    /*{
      path: '/',
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
        },
        {
          path: '/success',
          name: 'success',
          meta: {
            title: '提交成功'
          },
          component: success
        }
      ]
    },*/
    {
      path: '/',
      name: 'index',
      meta: {
        title: '基本信息'
      },
      component: baseInfo
    },
    {
      path: '/timeChoice',
      name: 'timeChoice',
      meta: {
        title: '医院选择'
      },
      component: timeChoice
    },
    /*{
      path: '/viewBooking',
      name: 'viewBooking',
      meta: {
        title: '预约服务'
      },
      component: viewBooking
    },*/
    {
      path: '/success',
      name: 'success',
      meta: {
        title: '提交成功'
      },
      component: success
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
      path: '/bookingChange',
      name: 'bookingChange',
      meta: {
        title: '退款服务'
      },
      component: bookingChange
    },
    /*{
      path: '/bookingsEndorse',
      name: 'bookingsEndorse',
      meta: {
        title: '申请改签'
      },
      component: bookingsInfo
    },*/
    {
      path: '/telLogin',
      name: 'telLogin',
      meta: {
        title: '预约查询'
      },
      component: telLogin
    },
    {
      path: '/refundSuccess',
      name: 'refundSuccess',
      meta: {
        title: '退款成功'
      },
      component: refundSuccess
    }
  ]
})
