import Vue from 'vue'
import Router from 'vue-router'
import GameHomeCom from '@/components/gameHome/GameHomeCom';
import Login from '@/components/login/LoginCom';
import Gamers from '@/components/gamers/GamersCom.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // 游戏123
    // {
    //   path: '/',
    //   name: 'GameHome',
    //   component: GameHomeCom
    // },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 玩家列表
    {
      path: '/gamers',
      name: 'Gamers',
      component: Gamers
    }
  ]
})
