/**
 * 登录
 * Created by qinmenghuan on 2017-08-25.
 */


import Vue from 'vue';
import constants from '../../common/constants.js';
import {Toast} from "mint-ui";
import SocketPlugin from '../../common/webSocket.js';
Vue.use(SocketPlugin);

export default {
	name: 'LoginCom',
	data() {
		return {
			logoUrl: require('../../assets/wuziqi.jpg'),
			gameName:constants.gameName,
			userdata: {
				pwd: "123456",
				telephone: "18672194345"
			}
		}
	},
	// 创建后login
	created() {

		var self = this;

		// window.websockObj = new WebSocket(constants.baseDomain+"login");
		window.websockObj=this.$returnLoginSocket();
		window.websockObj.onopen = function () {
			console.log("open成功");
			// window.websockObj.send("openhello");
		}
		window.websockObj.onmessage = function (evt) {
			console.log(evt.data);
			if(evt.data){
				// debugger;
				let responseData= JSON.parse(evt.data);
				if (responseData.type=="Login") {
					if(responseData.response_code=="200"){
						// 登录成功
					}else{
						Toast(responseData.response_msg);
					}
				}
				// 登陆12f
				else if (responseData.type=="Search"&&responseData.response_code=="200"){
					localStorage.setItem('currentUser',JSON.stringify(self.userdata));
					self.$router.replace("/gamers");
				}
			}
		}
		window.websockObj.onclose = function () {
			console.log("客户端断开");
			Toast("断开连接了，请重连");
		};
		window.websockObj.onerror = function (evt) {
			console.log("报错");
		};
	},
	methods: {
		// 登录
		login: function (event) {
			// let socketObj= {type: "Login",	msg: "login request",telephone:"2341234"};
			let socketObj= {type: "Login",	msg: "login request",data:this.userdata};
			window.websockObj.send(JSON.stringify(socketObj));
		}
	}
}
