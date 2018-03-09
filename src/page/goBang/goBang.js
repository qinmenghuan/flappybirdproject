/**
 * 五子棋棋盘
 * Created by qinmenghuan on 2017-08-25.
 */

var cellNumber=10;// 横排多少个棋格
var boardWidth=0; //游戏
var gameCanvas=null;  // 游戏
var pieceImg_white,
  pieceImg_black,
  cellWidth,
  boardMargin=25,
  colorIsBlack=true,
  pieceIndexList=[];


export default {
	name: 'GoBang',
	data() {
		return {
      gameCanvas:null,
      gameCtx:null,
      boardWidth:0
		}
	},

  // 面板组件加载后
  mounted(){
    this.init();
  },
	methods: {
    // 初始化
    init(){
      let self=this;
      self.gameCanvas=document.getElementById("gameboard");
      boardWidth = window.innerWidth-40;
      this.gameCanvas.width=boardWidth;
      this.gameCanvas.height=boardWidth;
      this.gameCtx=this.gameCanvas.getContext("2d");

      // 加载图片资源
      pieceImg_white=new Image();
      pieceImg_white.onload=function () {
        // 渲染界面
        self.renderGame();
      }
      pieceImg_white.src=require('../../assets/piece_white.png');
      pieceImg_black=new Image();
      pieceImg_black.src=require('../../assets/piece_black.png');

      // 监听触摸事件
      document.addEventListener("touchstart",self.touchOnpress);
    },
    runGame(){
    },
    // 渲染页面
    renderGame(){
      // 设置填充背景颜色
      this.gameCtx.fillStyle="#ce5e08";
      this.gameCtx.fillRect(0,0,boardWidth,boardWidth);
      this.gameCtx.fillStyle="#ffe198";
      this.gameCtx.fillRect(boardMargin,boardMargin,boardWidth-2*boardMargin,boardWidth-2*boardMargin);

      // 初始化网格
      cellWidth=(boardWidth-2*boardMargin)/cellNumber;
      this.gameCtx.lineWidth = 1;
      this.gameCtx.strokeStyle = '#532d06';
      // 循环遍历网格
      for(let i=0;i<cellNumber+1;i++){
        // 横向线
        this.gameCtx.moveTo(boardMargin,boardMargin+i*cellWidth);
        this.gameCtx.lineTo(boardWidth-boardMargin,boardMargin+i*cellWidth);
        // 纵向线
        this.gameCtx.moveTo(i*cellWidth+boardMargin,boardMargin);
        this.gameCtx.lineTo(i*cellWidth+boardMargin,boardWidth-boardMargin);
      }
      this.gameCtx.stroke();
    },
    // 触摸事件
    touchOnpress(evt){
      var mx=evt.offsetX,my=evt.offsetY;
      // 兼容手机端
      if(mx==null||my==null){
        mx=evt.touches[0].clientX;
        my=evt.touches[0].clientY;
      }
      console.log("mx:",mx,"my:",my);
      // 校验落子在棋盘外
      // 落子
      let pieceMargin=boardMargin-cellWidth/2;
      let xCellIndex=parseInt((mx-pieceMargin)/cellWidth);
      let yCellIndex=parseInt((my-pieceMargin)/cellWidth);
      // 校验

      pieceIndexList.push({xCellIndex:xCellIndex,yCellIndex:yCellIndex});
      let pieceWidth=cellWidth;// 棋子宽度
      let pieceImage=colorIsBlack?pieceImg_black:pieceImg_white;
      this.gameCtx.drawImage(pieceImage,pieceMargin+xCellIndex*cellWidth,pieceMargin+yCellIndex*cellWidth,pieceWidth,pieceWidth);
      colorIsBlack=!colorIsBlack;
    },
		// 登录
		login: function(event) {
		}
	}
}
