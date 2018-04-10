<template>
    <div id="gamers">
        <mt-header title="在线">
        </mt-header>
        <ul class="userlist">
            <li v-for="item in userList">
                <img :src="gamerUrl"/>
                <div>
                    <h4>{{item.telephone}}</h4>
                    <p>中国</p>
                </div>
                <button @click="inviteUser(item)">邀请对战</button>
            </li>
        </ul>
    </div>
</template>

<script type="es6" src="./gamers.js"></script>
<style lang="scss" scoped src="./gamers.scss"></style>
