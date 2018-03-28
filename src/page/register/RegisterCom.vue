<template>
    <div id="registerPage" class="loginPage">
        <mt-header title="注册">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="registerBody">
            <h2>{{gameName}}</h2>
            <form class="baseForm">
                <div class="formline">
                    <i class="iconfont icon-wodetubiao-12"></i>
                    <input class="horiControl" type="tel" v-model.trim="registerObj.telephone" placeholder="请输入手机号"/>
                </div>
                <div class="formline">
                    <i class="iconfont icon-wodetubiao-18 password"></i>
                    <input type="password" class="horiControl" v-model.trim="registerObj.pwd" placeholder="请输入密码"/>
                </div>
                <div class="formline">
                    <i class="iconfont icon-wodetubiao-18 password"></i>
                    <input type="password" class="horiControl" v-model.trim="registerObj.repwd" placeholder="请再次输入密码"/>
                </div>
            </form>
            <button @click="register()" class="baseLongBtn" id="loginBtn">注册</button>
        </div>

    </div>
</template>

<script type="es6" src="./register.js"></script>

<style lang="scss" scoped src="./register.scss"></style>
