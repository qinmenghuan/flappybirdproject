<template >
  <div id="loginPage">
    <!--<img :src="logoUrl"/>-->
    <form class="baseForm">
      <div class="formline">
        <i class="iconfont icon-wodetubiao-12"></i>
        <input class="horiControl" type="tel" v-model.trim="socketMsg.user" placeholder="请输入账号" />
      </div>
      <div class="formline">
        <i class="iconfont icon-wodetubiao-18 password"></i>
        <input type="password"  class="horiControl" placeholder="请输入密码"/>
      </div>
    </form>
    <button @click="login()" class="greenBtn" id="loginBtn">登录</button>
  </div>
</template>

<script type="es6" src="./login.js"></script>

<style lang="scss" src="./login.scss"></style>
