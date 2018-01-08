import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import GameHomeCom from '@/components/gameHome/GameHomeCom'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // 游戏123
    {
      path: '/',
      name: 'GameHome',
      component: GameHomeCom
    }
  ]
})
