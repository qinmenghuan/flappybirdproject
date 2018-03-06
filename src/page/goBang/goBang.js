/**
 * 五子棋棋盘
 * Created by qinmenghuan on 2017-08-25.
 */

export default {
	name: 'GoBang',
	data() {
		return {
      gameCanvas:null,
      gameCtx:null,
		}
	},
	// 创建后login
	created() {
	  this.init();
	},
  // 面板组件加载后
  mounted(){
    this.gameCanvas=document.getElementById("gameboard");
    let width = window.innerWidth;
    this.gameCanvas.width=width;
    this.gameCanvas.height=width;
    this.gameCtx=this.gameCanvas.getContext("2d");
    // 设置填充背景颜色
    this.gameCtx.fillStyle="#70C5CF";
    this.gameCtx.fillRect(0,0,width,width);

    // this.gameCtx.fillStyle = '#ff4200';//fillStyle代表的是填充颜色
    // this.gameCtx.fillRect(0,0,400,300);//fillRect中第一第二个参数代表的是开始的坐标位置，这里是0，0也就是代表从左上角开始，第三第四个参数代表的是所绘制的图形的宽和高。
    // this.gameCtx.fillStyle = 'red';
    // this.gameCtx.strokeStyle = 'blue';//strokeStyle代表的是边框的颜色
    // this.gameCtx.lineWidth = 2;
    // this.gameCtx.fillRect(50,50,100,100);//fillRect里的第一、二个参数代表的开始的坐标位置，第三和第四个参数代表的是绘制图形的宽高。
    // this.gameCtx.strokeRect(50,50,100,100);
    //context.clearRect(50,50,100,100);//clearRect()方法实现的是让选定的区域的填充色变为透明。。


  },
	methods: {
    // 初始化
    init(){
      let gameCanvas=document.getElementById("gameboard");
      // let height=window.innerHeight;
      let width = window.innerWidth;
      // gameCanvas.width=width;
      // gameCanvas.height =width;th=width;
      // gameCanvas.height =width;
      // gameCanvas.width=width;
      // gameCanvas.height=width;


    },
		// 登录
		login: function(event) {
		}
	}
}
