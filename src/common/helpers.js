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
	}
};
