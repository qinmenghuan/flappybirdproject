/**
 * 路由
 * Created by qinmenghuan on 2017-08-25.
 */

import Vue from 'vue'
import Router from 'vue-router'
import GameHomeCom from '@/components/gameHome/GameHomeCom';
import Login from '@/page/login/LoginCom';
import Gamers from '@/page/gamers/GamersCom.vue';
import Register from '@/page/register/RegisterCom';

// 五子棋 开始
import GoBang from '@/page/goBang/goBang.vue';
// 五子棋 结束

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'L',
			component: Login
		},
		// 五子棋主界面
		{
			path: '/goBang',
			name: 'GoBang',
			component: GoBang
		},
		// 登录
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		// 注册
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		// 玩家列表
		{
			path: '/gamers',
			name: 'Gamers',
			component: Gamers
		}
	]
})
