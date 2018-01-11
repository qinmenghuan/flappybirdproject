/**
 * 玩家列表
 * Created by qinmenghuan on 2017-08-25.
 */

export default {
	name: 'Gamers',
	data() {
		return {
      gamerUrl: require('../../assets/gamer.png'),
			logoUrl: require('../../assets/bird.png'),
			userList:[]
		}
	},
	// 创建后
	created() {
    var self=this;
    let gamews=new WebSocket('ws://localhost:9876/gamelogin');
    gamews.onopen=function(){
      gamews.send("Search");
    }
    gamews.onmessage=function(evt){
      if(evt.data){
        // this.route.push("");123
        console.log("gamers:",evt.data);
        self.userList = JSON.parse(evt.data);
      }
    }
    gamews.onclose=function(){
      console.log("客户端断开");
    };
    gamews.onerror=function(evt){
      console.log("报错");
    };


    // var self=this;
    // window.websockObj=new WebSocket('ws://localhost:9876/login');
    // window.websockObj.onopen=function(){
    //   // console.log("open123");
    //   // window.websockObj.send("hello");
    // }
    // window.websockObj.onmessage=function(evt){
    //   if(evt.data){
    //     // this.route.push("");
    //     self.$router.replace("/");
    //   }
    //   console.log("message:",evt);
    //   // oUl.innerHTML+="<li>"+evt.data+"</li>";
    // }
    // window.websockObj.onclose=function(){
    //   console.log("客户端断开");
    //   // oUl.innerHTML+="<li>客户端已断开连接</li>";
    // };
    // window.websockObj.onerror=function(evt){
    //   console.log("报错");
    //   // oUl.innerHTML+="<li>"+evt.data+"</li>";
    // };
	},
	methods: {
	}
}
