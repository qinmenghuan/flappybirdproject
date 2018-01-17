<template >
  <div id="gamers">
    <header class="mainheader">在线人员</header>
    <ul class="userlist">
      <li v-for="item in userList">
        <img :src="gamerUrl"/>
        <div>
          <h4>{{item.username}}</h4>
          <p>中国</p>
        </div>
        <button>加入对战</button>
      </li>
    </ul>
  </div>
</template>

<script type="es6" src="./gamers.js"></script>

<style lang="scss" scoped src="./gamers.scss"></style>
