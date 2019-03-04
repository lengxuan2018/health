// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import tap from './directives/tap'  // 手势
import 'muse-ui/lib/styles/base.less';      //muse-ui日历组件
import { Picker } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './config/config.js'    //配置文件,后期更改接口域名
import qs from 'qs'

Vue.use(VueAxios,axios);
Vue.use(Picker);
Vue.directive('tap',tap);
Vue.use(Mint);
Vue.config.productionTip = false;

Vue.prototype.$qs = qs;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

/*
//对axios进行事件添加：
const Axios = axios.create({
  baseURL: "/", // 本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
  });
*/
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

