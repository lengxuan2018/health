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

Vue.use(Picker);
Vue.directive('tap',tap);
Vue.use(Mint);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
