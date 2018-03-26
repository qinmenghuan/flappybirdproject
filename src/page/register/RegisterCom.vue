<template>
    <div id="registerPage" class="loginPage">
        <mt-header title="注册">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <!--<mt-button icon="more" slot="right"></mt-button>-->
        </mt-header>
        <div class="registerBody">
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
                <div class="formline">
                    <i class="iconfont icon-wodetubiao-18 password"></i>
                    <input type="password" class="horiControl" placeholder="请再次输入密码"/>
                </div>
            </form>
            <button @click="login()" class="baseLongBtn" id="loginBtn">注册</button>
        </div>

    </div>
</template>

<script type="es6" src="./register.js"></script>

<style lang="scss" scoped src="./register.scss"></style>
