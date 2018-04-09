// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.1

import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.min.css'
import Mint from 'mint-ui'
import SocketPlugin from './common/webSocket.js'

Vue.use(Mint)
Vue.config.productionTip = false
Vue.use(SocketPlugin)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {App}
})
