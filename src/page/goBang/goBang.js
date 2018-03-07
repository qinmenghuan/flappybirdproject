/**
 * 五子棋棋盘
 * Created by qinmenghuan on 2017-08-25.
 */

// 横排多少个棋格
var cellNumber=10;

export default {
	name: 'GoBang',
	data() {
		return {
      gameCanvas:null,
      gameCtx:null,
      cellWidth:null
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
      let width = window.innerWidth-40;
      this.gameCanvas.width=width;
      this.gameCanvas.height=width;
      this.gameCtx=this.gameCanvas.getContext("2d");
      // 设置填充背景颜色
      this.gameCtx.fillStyle="#ffe198";
      this.gameCtx.fillRect(0,0,width,width);

      // 初始化网格
      this.cellWidth=width/cellNumber;
      this.gameCtx.lineWidth = 1;
      this.gameCtx.strokeStyle = '#532d06';
      // 循环遍历网格
      for(let i=0;i<cellNumber;i++){
        // 横向线
        this.gameCtx.moveTo(0,i*this.cellWidth);
        this.gameCtx.lineTo(width,i*this.cellWidth);
        // 纵向线
        this.gameCtx.moveTo(i*this.cellWidth,0);
        this.gameCtx.lineTo(i*this.cellWidth,width);
      }
      this.gameCtx.stroke();
    },
		// 登录
		login: function(event) {
		}
	}
}
