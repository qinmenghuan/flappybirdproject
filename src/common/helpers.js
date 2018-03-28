/**
 *  共同方法
 * Created by qinmenghuan on 2017-08-28.
 */

export default {
	// 判断登陆
	isLogin: function() {
		var userInfoObj = localStorage.getItem('userInfo');
		if(userInfoObj && userInfoObj != "") {
			return true;
		} else {
			return false;
		}
	},
	// 获取用户信息
	getUserInfo: function() {
		var userInfoStr = localStorage.getItem('currentUser');
		if(userInfoStr && userInfoStr != "") {
			return JSON.parse(userInfoStr);
		} else {
			return null;
		}
	},
	// 获取当前游戏棋局信息
	getGameInfo(){
		let gameInfoStr = localStorage.getItem("gameInfo");
		let gameInfo = null;
		if (gameInfoStr) {
			gameInfo = JSON.parse(gameInfoStr);
		}
		return  gameInfo;
	},
	// 当前用户是否是邀请方
	userIsBlack(){
		let userInfoStr = localStorage.getItem('currentUser');
		let userInfo=null;
		if(userInfoStr ) {
			userInfo= JSON.parse(userInfoStr);
		}

		let gameInfoStr = localStorage.getItem("gameInfo");
		let gameInfo = null;
		if (gameInfoStr) {
			gameInfo = JSON.parse(gameInfoStr);
		}

		let isBlack = false;
		isBlack = userInfo.username == gameInfo.aUsername;
		return isBlack;
	},
	// 校验手机号12
	checkPhone(phone){
		return /^1[345678]\d{9}$/.test(phone)
	},
	// 校验密码
	checkPassword(pwd){
		let flag=/^[\w]{6,16}$/.test(pwd)
		return flag;
	}
};
