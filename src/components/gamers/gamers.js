/**
 * 玩家列表
 * Created by qinmenghuan on 2017-08-25.
 */

import  Helpers from "../../common/helpers.js";
import {Toast,MessageBox} from 'mint-ui';

export default {
	name: 'Gamers',
	data() {
		return {
      gamerUrl: require('../../assets/gamer.png'),
			logoUrl: require('../../assets/bird.png'),
			userList:[],
      inviteWs:null
		}
	},
	// 创建后
	created() {
    var self=this;
    // 获取用户列表信息
    let gamews=new WebSocket('ws://localhost:9876/gamelogin');
    gamews.onopen=function(){
      gamews.send("Search");
    }
    gamews.onmessage=function(evt){
      console.log("gameloginmessage");
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

    // 邀请用户对战
    self.inviteWs =new WebSocket('ws://localhost:9876/invite');
    self.inviteWs.onopen=function(){
      let wsobj={type:'init'};
      self.inviteWs.send(JSON.stringify(wsobj));
      console.log("inviteopen");
    }
    self.inviteWs.onmessage=function(evt){
      // 发送邀请成功12
      if(evt.data==="inviteSuccess"){
        Toast('已发送邀请成功');
      }else{
        // 是否接受挑战
        let inviteObj = JSON.parse(evt.data) ;
        let invitemsg="是否接受"+inviteObj.aUsername+"的挑战？"
        MessageBox.confirm(invitemsg).then(action => {
          console.log("确定接受");
        });
      }
      console.log("invitemsg:",evt.data);
      // if(evt.data){1
      //   // this.route.push("");
      //   self.$router.replace("/");
      // }
    }
    self.inviteWs.onclose=function(){
      console.log("客户端断开1");
    };
    self.inviteWs.onerror=function(evt){
      console.log("报错");
    };

	},
	methods: {
    inviteUser(userItem){
      let self = this;
      let userinfo = Helpers.getUserInfo();
      // 拼接邀请对象12
      let inviteobj = {};
      inviteobj.aUsername=userinfo.username;
      inviteobj.aWsIndex=userinfo.wsindex;
      inviteobj.bUsername=userItem.username;
      inviteobj.bWsIndex=userItem.wsindex;
      inviteobj.status=1;
      let params={type:"sendinvite",msgobj:inviteobj};

      // 发送请求
      self.inviteWs.send(JSON.stringify(params));
    }
	}
}
