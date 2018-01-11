/**
 * 游戏主页13
 * Created by qinmenghuan on 2017-08-25.
 */

import {gameinit} from "./home";


export default {
	name: 'GameHomeCom',
	data() {
		return {
      massage:"abc",
      socketMsg:{
        type:"aaa",
        msg:"start game",
        group:"Agroup",
        user:"AAA"
      }
		}
	},
	methods: {

	},
	created:function () {
	  console.log("created");
    // require("./home.js");
	 //  return;
	 //  var self=this;
    // var ws=new WebSocket('ws://localhost:9876');
    // ws.onopen=function(){
    //   ws.send(JSON.stringify (self.socketMsg));
    //   // ws.send(self.socketMsg.toString());
    //   // ws.send("hello server1");
    //   console.log("open");
    //   // oUl.innerHTML+="<li>客户端已连接</li>";
    // }
    // ws.onmessage=function(evt){
    //   console.log("message:",evt);
    //   // oUl.innerHTML+="<li>"+evt.data+"</li>";
    // }
    // ws.onclose=function(){
    //   console.log("客户端断开");
    //   // oUl.innerHTML+="<li>客户端已断开连接</li>";
    // };
    // ws.onerror=function(evt){
    //   console.log("报错");
    //   // oUl.innerHTML+="<li>"+evt.data+"</li>";
    // };

  },
  mounted(){
    // console.log("mounted");
	 //  const s = document.createElement('script');
    // s.type = 'text/javascript';
    // // s.src = './src/components/gameHome/home.js';
    // // s.src = require("./home.js");
    // document.body.appendChild(s);

    gameinit();
    // require("./home.js");
  }
}
