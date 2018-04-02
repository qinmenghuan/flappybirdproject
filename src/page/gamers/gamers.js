/**
 * 玩家列表
 * Created by qinmenghuan on 2017-08-25.
 */

import Vue from 'vue'
import Helpers from "../../common/helpers.js";
import {Toast, MessageBox} from 'mint-ui';
import SocketPlugin from '../../common/webSocket.js';
Vue.use(SocketPlugin);
let currentInvite={};

export default {
	name: 'Gamers',
	data() {
		return {
			gamerUrl: require('../../assets/gamer.png'),
			logoUrl: require('../../assets/bird.png'),
			userList: [],
			inviteWs: null
		}
	},
	// 创建后
	created() {
		var self = this;
		let loginSocket=this.$returnLoginSocket();
		//设置连接成功后的回调函数
		loginSocket.onopen=function () {
			let socketObj= {type: "Search",msg: "Search request",data:{}};
			// 判断socket的状态
			loginSocket.send(JSON.stringify(socketObj));
		};
		loginSocket.onmessage = function (evt) {
			if(evt.data){
				// debugger;
				let responseData= JSON.parse(evt.data);
				if (responseData.type=="Search") {
					if(responseData.response_code=="200"){
						// 查询成功
						self.userList = responseData.response_data;
					}else{
						Toast(responseData.response_msg);
					}
				}
			}
		}
		loginSocket.onclose = function () {
			console.log("客户端断开");
		};
		loginSocket.onerror = function (evt) {
			console.log("报错");
		};

		let socketObj= {type: "Search",msg: "Search request",data:{}};
		// 判断socket的状态
		if(loginSocket.readyState===1){
			loginSocket.send(JSON.stringify(socketObj));
		}


		// 邀请用户对战
		// self.inviteWs = new WebSocket('ws://localhost:9876/invite');
		// self.inviteWs.onopen = function () {
		// 	let wsobj = {type: 'init'};
		// 	self.inviteWs.send(JSON.stringify(wsobj));
		// 	console.log("inviteopen");
		// }
		// self.inviteWs.onmessage = function (evt) {
		// 	// 是否接受挑战
		// 	let inviteObj = JSON.parse(evt.data);
		// 	// 发送邀请成功12
		// 	if (inviteObj.type  === "inviteSuccess") {
		// 		Toast('已发送邀请成功');
		// 	}
		// 	// 被邀请
		// 	else if (inviteObj.type==="beInvited"){
		// 		let invitemsg = "是否接受" + inviteObj.data.aUsername + "的挑战？"
		// 		MessageBox.confirm(invitemsg).then(action => {
		// 			console.log("确定接受");
		// 			// 发送接受请求
		// 			let params = {type: "agreeinvite", msgobj: inviteObj.data};
		// 			self.inviteWs.send(JSON.stringify(params));
		// 		});
		// 	}
		// 	// 邀请成功
		// 	else if(inviteObj.type==="AGREE"){
		// 		// MessageBox.confirm("匹配成功").then(action => {
		// 			// 保存对象
		// 			localStorage.setItem("gameInfo",JSON.stringify(inviteObj.data));
		// 			// 跳转游戏界面
		// 			self.$router.push("/goBang");
		// 		// });
		// 	}else{
		// 	}
		//
		// 	// console.log("invitemsg:", evt.data);
		// 	// if(evt.data){1
		// 	//   // this.route.push("");
		// 	//   self.$router.replace("/");
		// 	// }
		// }
		// self.inviteWs.onclose = function () {
		// 	console.log("客户端断开1");
		// };
		// self.inviteWs.onerror = function (evt) {
		// 	console.log("报错");
		// };

	},
	methods: {
		inviteUser(userItem) {
			let self = this;
			let userinfo = Helpers.getUserInfo();
			console.log("userinfo:",userinfo);
			// 拼接邀请对象12
			let inviteobj = {};
			inviteobj.aUsername = userinfo.username;
			inviteobj.aWsIndex = userinfo.wsindex;
			inviteobj.bUsername = userItem.username;
			inviteobj.bWsIndex = userItem.wsindex;
			inviteobj.status = 1;
			let params = {type: "sendinvite", msgobj: inviteobj};
			// 保存当前邀请对象
			currentInvite=inviteobj;

			// 发送请求
			self.inviteWs.send(JSON.stringify(params));
		}
	}
}
