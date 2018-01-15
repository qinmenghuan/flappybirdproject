/**
 * 登录
 * Created by qinmenghuan on 2017-08-25.
 */
// import 'lib-flexible/flexible.js'

export default {
	name: 'LoginCom',
	props: {
		inputValue: String
	},
	data() {
		return {
			logoUrl: require('../../assets/bird.png'),
			phonenum: "",
			password: "",
      socketMsg:{
        type:"Login",
        msg:"login request",
        group:"",
        user:""
      },
      versioninfo:""
		}
	},
	// 创建后login123
	created() {
    var self=this;


    window.websockObj=new WebSocket('ws://localhost:9876/gamelogin');
    window.websockObj.onopen=function(){
      // console.log("open123");
      // window.websockObj.send("hello");
    }
    window.websockObj.onmessage=function(evt){
      if(evt.data){
        // this.route.push("");
        self.$router.replace("/gamers");
      }
      console.log("message:",evt);
      // oUl.innerHTML+="<li>"+evt.data+"</li>";
    }
    window.websockObj.onclose=function(){
      console.log("客户端断开");
      // oUl.innerHTML+="<li>客户端已断开连接</li>";
    };
    window.websockObj.onerror=function(evt){
      console.log("报错");
      // oUl.innerHTML+="<li>"+evt.data+"</li>";
    };
	},
  mounted:function () {
    document.addEventListener("deviceready", this.devicefunc, false);
  } ,
	methods: {
    devicefunc:function() {
      alert(AppVersion.version);
      alert(AppVersion.build);
      // 获取版本信息
      if(cordova){
        cordova.getAppVersion.getVersionNumber().then(function (version) {
          self.versioninfo=version;
          // $('.version').text(version);
        });
      }
    },
		// 登录
		login: function(event) {
      window.websockObj.send(JSON.stringify (this.socketMsg));
		}
	}
}
