/**
 * 注册
 * Created by qinmenghuan on 2017-08-25.
 */

import constants from '../../common/constants.js';
import {Toast, Indicator, MessageBox} from "mint-ui";
import helpers from "../../common/helpers.js";
import httpRequest from "../../common/ajax.js";

export default {
	name: 'RegisterCom',
	components: {
		// Header
	},
	// data
	data() {
		return {
			gameName: constants.gameName,
			registerObj: {
				telephone: "",
				pwd: "",
				repwd: ""
			}
		}
	},
	// 创建后login
	created() {
	},
	methods: {
		// 注册
		register: function (event) {

			// 校验手机号
			if(!helpers.checkPhone(this.registerObj.telephone)){
				Toast('请输入正确的手机号');
				return;
			}

			// 校验密码
			if(!helpers.checkPassword(this.registerObj.pwd)||!helpers.checkPassword(this.registerObj.repwd)){
				Toast('请输入6-16位字母或数字密码');
				return;
			}

			// 校验重复输入密码
			if(this.registerObj.pwd!=this.registerObj.repwd){
				Toast('请输入相同的确认密码');
				return;
			}

			Indicator.open();
			httpRequest({
				url: "user/register",
				params: this.registerObj,
				success: (response) => {
					MessageBox.alert('用户注册成功').then(action => {
						window.history.go(-1);
					});
				},
				complete: () => {
					Indicator.close();
				}
			});
		}
	}
}
