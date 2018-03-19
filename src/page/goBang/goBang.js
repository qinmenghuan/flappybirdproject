/**
 * 五子棋棋盘
 * Created by qinmenghuan on 2017-08-25.
 */

import Helpers from "../../common/helpers";

var cellNumber = 10;// 横排多少个棋格
var boardWidth = 0; //游戏
var gameCanvas = null;  // 游戏
var pieceImg_white,
	pieceImg_black,
	cellWidth,
	boardMargin = 25,
	colorIsBlack = true,
	pieceMargin,// 可落子区域边距
	boardPieceState = {},
	five = 5,
	gameStatus = 1,   // 0 准备,不能下棋   1 游戏中   2 结束游戏
	gameWebSocket = null     // 游戏websocket
;

export default {
	name: 'GoBang',
	data() {
		return {
			gameCanvas: null,
			gameCtx: null,
			boardWidth: 0,
			gameSocket: null
		}
	},

	// 面板组件加载后
	mounted() {
		this.init();
	},
	methods: {
		// 初始化
		init() {
			let self = this;
			self.gameCanvas = document.getElementById("gameboard");
			boardWidth = window.innerWidth;
			this.gameCanvas.width = boardWidth;
			this.gameCanvas.height = boardWidth;
			this.gameCtx = this.gameCanvas.getContext("2d");
			// 初始化游戏状态
			if (Helpers.userIsBlack()) {
				gameStatus = 1;
			} else {
				gameStatus = 0;
			}

			// 加载图片资源
			pieceImg_white = new Image();
			pieceImg_white.onload = function () {
				// 渲染界面
				self.renderGame();
			}
			pieceImg_white.src = require('../../assets/piece_white.png');
			pieceImg_black = new Image();
			pieceImg_black.src = require('../../assets/piece_black.png');

			// 监听触摸事件
			document.addEventListener("touchstart", self.touchOnpress);

			// 连接游戏服务器
			self.connectSocket();
		},
		runGame() {
		},
		// 连接游戏服务器
		connectSocket() {
			let self = this;
			// 游戏socket
			gameWebSocket = new WebSocket('ws://localhost:9876/game');
			gameWebSocket.onopen = function () {
				console.log("opengame");
				// 初始化websocket
				let userinfo = Helpers.getUserInfo();
				let wsobj = {type: 'init', username: userinfo.username};
				gameWebSocket.send(JSON.stringify(wsobj));
			}
			gameWebSocket.onmessage = function (evt) {
				console.log("gameloginmessage", evt.data);
				// debugger;
				let gameObj = JSON.parse(evt.data);
				if (gameObj.type = "gaming") {
					let gameStep = gameObj["msgobj"];
					let pieceImage = colorIsBlack ? pieceImg_black : pieceImg_white;
					pieceMargin = boardMargin - cellWidth / 2;
					self.gameCtx.drawImage(pieceImage, pieceMargin + gameStep.xCellIndex * cellWidth, pieceMargin + gameStep.yCellIndex * cellWidth, cellWidth, cellWidth);
					// 判断输赢
					self.checkWin(gameStep);

					// 更新游戏状态
					gameStatus=1;

					// 改变颜色
					colorIsBlack = !colorIsBlack;
				} else if (gameObj.type = "GameOver") {
					let gameStep = gameObj["msgobj"];
					let pieceImage = colorIsBlack ? pieceImg_black : pieceImg_white;
					pieceMargin = boardMargin - cellWidth / 2;
					self.gameCtx.drawImage(pieceImage, pieceMargin + gameStep.xCellIndex * cellWidth, pieceMargin + gameStep.yCellIndex * cellWidth, cellWidth, cellWidth);
					// 判断输赢
					self.checkWin(gameStep);
				}
			}
			gameWebSocket.onclose = function () {
				console.log("客户端断开");
			};
			gameWebSocket.onerror = function (evt) {
				console.log("报错");
			};
		},
		// 渲染页面
		renderGame() {
			// 设置填充背景颜色
			this.gameCtx.fillStyle = "#ce5e08";
			this.gameCtx.fillRect(0, 0, boardWidth, boardWidth);
			this.gameCtx.fillStyle = "#ffe198";
			this.gameCtx.fillRect(boardMargin, boardMargin, boardWidth - 2 * boardMargin, boardWidth - 2 * boardMargin);

			// 初始化网格
			cellWidth = (boardWidth - 2 * boardMargin) / cellNumber;
			this.gameCtx.lineWidth = 1;
			this.gameCtx.strokeStyle = '#532d06';
			// 循环遍历网格
			for (let i = 0; i < cellNumber + 1; i++) {
				// 横向线
				this.gameCtx.moveTo(boardMargin, boardMargin + i * cellWidth);
				this.gameCtx.lineTo(boardWidth - boardMargin, boardMargin + i * cellWidth);
				// 纵向线
				this.gameCtx.moveTo(i * cellWidth + boardMargin, boardMargin);
				this.gameCtx.lineTo(i * cellWidth + boardMargin, boardWidth - boardMargin);
			}
			this.gameCtx.stroke();
		},
		// 触摸事件
		touchOnpress(evt) {
			// 游戏状态校验
			if (gameStatus >= 2||gameStatus==0) {
				return;
			}

			var mx = evt.offsetX, my = evt.offsetY;
			// 兼容手机端
			if (mx == null || my == null) {
				mx = evt.touches[0].clientX;
				my = evt.touches[0].clientY;
			}
			// console.log("mx:",mx,"my:",my);
			// 校验落子在棋盘外
			if (mx < pieceMargin || mx > (boardWidth - boardMargin + cellWidth / 2)
				|| my < pieceMargin || my > (boardWidth - boardMargin + cellWidth / 2)) {
				return;
			}
			// 落子
			pieceMargin = boardMargin - cellWidth / 2;
			let xCellIndex = parseInt((mx - pieceMargin) / cellWidth);
			let yCellIndex = parseInt((my - pieceMargin) / cellWidth);
			// 校验重复落子
			let newIndexKey = xCellIndex + "-" + yCellIndex;
			if (boardPieceState.hasOwnProperty(newIndexKey)) {
				return;
			}

			boardPieceState[xCellIndex + "-" + yCellIndex] = colorIsBlack;
			let currentPiece = {xCellIndex: xCellIndex, yCellIndex: yCellIndex, isBlack: colorIsBlack};
			let pieceWidth = cellWidth;// 棋子宽度
			let pieceImage = colorIsBlack ? pieceImg_black : pieceImg_white;
			this.gameCtx.drawImage(pieceImage, pieceMargin + xCellIndex * cellWidth, pieceMargin + yCellIndex * cellWidth, pieceWidth, pieceWidth);
			// 判断输赢
			this.checkWin(currentPiece);
			// 发送socket请求
			this.playChess(currentPiece);

			// 更新游戏状态
			gameStatus=0;

			// 改变颜色
			colorIsBlack = !colorIsBlack;
		},
		// 下棋
		playChess(currentPiece) {
			let userinfo = Helpers.getUserInfo();
			let gameInfo = Helpers.getGameInfo();
			let opponentName = "";
			opponentName = userinfo.username == gameInfo.aUsername ? gameInfo.bUsername : gameInfo.aUsername;
			currentPiece["opponentName"] = opponentName;
			currentPiece["gameIndex"] = gameInfo.gameIndex;

			// 如果游戏结束
			let params = {};
			if (gameStatus >= 2) {
				currentPiece["gameStatus"] = gameStatus;
				params = {type: "GameOver", msgobj: currentPiece};
			} else {
				params = {type: "gaming", msgobj: currentPiece};
			}

			// 发送请求
			gameWebSocket.send(JSON.stringify(params));
		},
		// 判断输赢
		checkWin(currentPiece) {
			// 横向判断
			let horizontalNum = 1, verticalNum = 1, leftUpSlopNum = 1, rightUpSlopNum = 1;
			let rightEnable = true, leftEnable = true,
				upEnable = true, downEnable = true,
				leftUpEnable = true, rightDownEnable = true,
				rightUpEnable = true, leftDownEnable = true;

			for (let i = 1; i < five; i++) {

				let yCellIndexPlusI = currentPiece.yCellIndex + i;
				let yCellIndexSubI = currentPiece.yCellIndex - i;
				let xCellIndexPlusI = currentPiece.xCellIndex + i;
				let xCellIndexSubI = currentPiece.xCellIndex - i;

				// 右
				if (rightEnable && (currentPiece.xCellIndex + i) <= cellNumber) {
					let indexKey = (currentPiece.xCellIndex + i) + "-" + currentPiece.yCellIndex;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						horizontalNum++;
					} else {
						rightEnable = false;
					}
				} else {
					rightEnable = false;
				}

				// 左
				if (leftEnable && (currentPiece.xCellIndex - i) >= 0) {
					let indexKey = (currentPiece.xCellIndex - i) + "-" + currentPiece.yCellIndex;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						horizontalNum++;
					} else {
						leftEnable = false;
					}
				}

				// 判断水平
				if (horizontalNum == five) {
					alert("结束");
					gameStatus = currentPiece.isBlack ? 2 : 3;
					return;
				}

				// 下
				if (downEnable && (currentPiece.yCellIndex + i) <= cellNumber) {
					let indexKey = currentPiece.xCellIndex + "-" + (currentPiece.yCellIndex + i);
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						verticalNum++;
					} else {
						downEnable = false;
					}
				} else {
					downEnable = false;
				}

				// 上
				if (upEnable && (currentPiece.yCellIndex - i) >= 0) {
					let indexKey = currentPiece.xCellIndex + "-" + (currentPiece.yCellIndex - i);
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						verticalNum++;
					} else {
						upEnable = false;
					}
				} else {
					upEnable = false;
				}

				// 判断水平
				if (verticalNum == five) {
					alert("水平结束");
					gameStatus = currentPiece.isBlack ? 2 : 3;
					return;
				}

				// 右下
				if (rightDownEnable && yCellIndexPlusI <= cellNumber && xCellIndexPlusI <= cellNumber) {
					let indexKey = xCellIndexPlusI + "-" + yCellIndexPlusI;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						leftUpSlopNum++;
					} else {
						rightDownEnable = false;
					}
				} else {
					rightDownEnable = false;
				}

				// 左上
				if (leftUpEnable && yCellIndexSubI >= 0 && xCellIndexSubI >= 0) {
					let indexKey = xCellIndexSubI + "-" + yCellIndexSubI;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						leftUpSlopNum++;
					} else {
						leftUpEnable = false;
					}
				} else {
					leftUpEnable = false;
				}

				// 判断左上斜线
				if (leftUpSlopNum == five) {
					alert("左上结束");
					gameStatus = currentPiece.isBlack ? 2 : 3;
					return;
				}

				// 右上
				if (rightUpEnable && yCellIndexSubI >= 0 && xCellIndexPlusI <= cellNumber) {
					let indexKey = xCellIndexPlusI + "-" + yCellIndexSubI;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						rightUpSlopNum++;
					} else {
						rightUpEnable = false;
					}
				} else {
					rightUpEnable = false;
				}

				// 左下
				if (leftDownEnable && xCellIndexSubI >= 0 && yCellIndexPlusI <= cellNumber) {
					let indexKey = xCellIndexSubI + "-" + yCellIndexPlusI;
					let state = boardPieceState[indexKey];
					if (state && state == currentPiece.isBlack) {
						rightUpSlopNum++;
					} else {
						leftDownEnable = false;
					}
				} else {
					leftDownEnable = false;
				}

				// 判断左上斜线
				if (rightUpSlopNum == five) {
					alert("右上结束");
					gameStatus = currentPiece.isBlack ? 2 : 3;
					return;
				}

			}


		},
		// 登录
		login: function (event) {
		}
	}
}
