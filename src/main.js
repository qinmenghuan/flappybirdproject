// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.1
import Vue from 'vue'
import App from './App'
import router from './router';
// import 'lib-flexible/flexible.js'
import 'mint-ui/lib/style.min.css';
import Mint from'mint-ui';
Vue.use(Mint);
Vue.config.productionTip = false;
import SocketPlugin from './common/webSocket.js';
Vue.use(SocketPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
