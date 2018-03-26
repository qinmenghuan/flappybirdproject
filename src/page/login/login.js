/**
 * 登录
 * Created by qinmenghuan on 2017-08-25.
 */

// import 'lib-flexible/flexible.js'
// import Vue from 'vue'
// import SocketPlugin from '../../common/webSocket.js';
// Vue.use(SocketPlugin);
import constants from '../../common/constants.js';

export default {
	name: 'LoginCom',
	data() {
		return {
			logoUrl: require('../../assets/wuziqi.jpg'),
			gameName:constants.gameName,
			socketMsg: {
				type: "Login",
				msg: "login request",
				group: "",
				user: ""
			}
		}
	},
	// 创建后login
	created() {
		console.log("value:",this.$myAddedProperty);
		console.log("value2:",this.$myAddedMethod());
		this.$myModifyMethod();
		this.$myAddedProperty="2";

		var self = this;
		// 登录
		window.websockObj = new WebSocket('ws://localhost:9876/gamelogin');
		window.websockObj.onopen = function () {
			// console.log("open123");
		}
		window.websockObj.onmessage = function (evt) {
			if (evt.data) {
				// 保存登录人信息
				localStorage.setItem("currentUser", evt.data);
				self.$router.replace("/gamers");
			}
			console.log("loginmessage:", evt);
		}
		window.websockObj.onclose = function () {
			console.log("客户端断开");
		};
		window.websockObj.onerror = function (evt) {
			console.log("报错");
		};
	},
	methods: {
		// 登录
		login: function (event) {
			console.log("startlogin");
			window.websockObj.send(JSON.stringify(this.socketMsg));
		}
	}
}
