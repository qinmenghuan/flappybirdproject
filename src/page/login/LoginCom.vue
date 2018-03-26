<template>
    <div id="loginPage" class="loginPage">
        <!--<img :src="logoUrl"/>-->
        <h2>{{gameName}}</h2>
        <form class="baseForm">
            <div class="formline">
                <i class="iconfont icon-wodetubiao-12"></i>
                <input class="horiControl" type="tel" v-model.trim="socketMsg.user" placeholder="请输入账号"/>
            </div>
            <div class="formline">
                <i class="iconfont icon-wodetubiao-18 password"></i>
                <input type="password" class="horiControl" placeholder="请输入密码"/>
            </div>
        </form>
        <button @click="login()" class="baseLongBtn" id="loginBtn">登录</button>
        <div class="routerBtn">
            <div class="flexdiv">
                <div class="alignLeft">
                    <button>忘记密码</button>
                </div>
                <div class="alignRight">
                    <router-link to="/register" slot="left">注册
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="es6" src="./login.js"></script>

<style lang="scss" scoped src="./login.scss"></style>
