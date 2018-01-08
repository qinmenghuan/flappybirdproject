/**
 * 登录
 * Created by qinmenghuan on 2017-08-25.
 */
// import 'lib-flexible/flexible.js'

export default {
	name: 'LoginCom',
	props: {
		inputValue: String
	},
	data() {
		return {
			logoUrl: require('../../assets/bird.png'),
			phonenum: "",
			password: ""
		}
	},
	// 创建后
	created() {
		console.log("clear");
		// 清理缓存
		//  localStorage.removeItem('userInfo');
	},
	methods: {
		// 登录
		login: function(event) {
		},
		// 注册
		register: function(event) {

    }
	}
}
