/**
 * 五子棋棋盘
 * Created by qinmenghuan on 2017-08-25.
 */

var cellNumber=10;// 横排多少个棋格
var boardWidth=0; //游戏

export default {
	name: 'GoBang',
	data() {
		return {
      gameCanvas:null,
      gameCtx:null,
      cellWidth:null,
      boardWidth:0
		}
	},
	// 创建后login
	created() {
	  this.init();
	},
  // 面板组件加载后
  mounted(){
    this.init();
  },
	methods: {
    // 初始化
    init(){
      this.gameCanvas=document.getElementById("gameboard");
      boardWidth = window.innerWidth-40;
      this.gameCanvas.width=boardWidth;
      this.gameCanvas.height=boardWidth;
      this.gameCtx=this.gameCanvas.getContext("2d");

      // 加载图片资源
      var pieceImg=new Image();
      pieceImg.onload=function () {
        // 初始化游戏对象
        initSprites(img);
        // 设置背景颜色
        ctx.fillStyle=s_bg.color;
        //
        okbtn={
          x:(width-s_buttons.Ok.width)/2,
          y:height-200,
          width:s_buttons.Ok.width,
          height:s_buttons.Ok.height
        };
        run();
      }
      pieceImg.src=require('../../assets/piece_white.png');

      // 渲染界面
      this.renderGame();
    },
    runGame(){

    },
    // 渲染页面
    renderGame(){
      // 设置填充背景颜色
      this.gameCtx.fillStyle="#ffe198";
      this.gameCtx.fillRect(0,0,boardWidth,boardWidth);

      // 初始化网格
      this.cellWidth=boardWidth/cellNumber;
      this.gameCtx.lineWidth = 1;
      this.gameCtx.strokeStyle = '#532d06';
      // 循环遍历网格
      for(let i=0;i<cellNumber;i++){
        // 横向线
        this.gameCtx.moveTo(0,i*this.cellWidth);
        this.gameCtx.lineTo(boardWidth,i*this.cellWidth);
        // 纵向线
        this.gameCtx.moveTo(i*this.cellWidth,0);
        this.gameCtx.lineTo(i*this.cellWidth,boardWidth);
      }
      this.gameCtx.stroke();


    },
		// 登录
		login: function(event) {
		}
	}
}
