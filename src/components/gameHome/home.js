/**
 * 游戏主页js逻辑
 * Created by qinmenghuan on 2017-08-25.
 */

var
  aaastr="aaa",
  s_bird,
  s_bg,
  s_fg,
  s_pipeNorth,
  s_pipeSouth,
  s_text,
  s_score,
  s_splash,
  s_buttons,
  s_numberS,
  s_numberB;


function Sprite(img, x, y, width, height) {
  this.img = img;
  this.x = x*2;
  this.y = y*2;
  this.width = width*2;
  this.height = height*2;
};
Sprite.prototype.draw = function(ctx, x, y) {
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
    x, y, this.width, this.height);
};

function initSprites(img) {
  // debugger;
  // console.log("init");
  s_bird = [
    new Sprite(img, 156, 115, 17, 12),
    new Sprite(img, 156, 128, 17, 12),
    new Sprite(img, 156, 141, 17, 12)
  ];

  s_bg = new Sprite(img,   0, 0, 138, 114);
  s_bg.color = "#70C5CF";
  s_fg = new Sprite(img, 138, 0, 112,  56);

  s_pipeNorth = new Sprite(img, 251, 0, 26, 200);
  s_pipeSouth = new Sprite(img, 277, 0, 26, 200);

  s_text = {
    FlappyBird: new Sprite(img, 59, 114, 96, 22),
    GameOver:   new Sprite(img, 59, 136, 94, 19),
    GetReady:   new Sprite(img, 59, 155, 87, 22)
  }
  s_buttons = {
    Rate:  new Sprite(img,  79, 177, 40, 14),
    Menu:  new Sprite(img, 119, 177, 40, 14),
    Share: new Sprite(img, 159, 177, 40, 14),
    Score: new Sprite(img,  79, 191, 40, 14),
    Ok:    new Sprite(img, 119, 191, 40, 14),
    Start: new Sprite(img, 159, 191, 40, 14)
  }

  s_score  = new Sprite(img, 138,  56, 113, 58);
  s_splash = new Sprite(img,   0, 114,  59, 49);

  s_numberS = new Sprite(img, 0, 177, 6,  7);
  s_numberB = new Sprite(img, 0, 188, 7, 10);

  s_numberS.draw = s_numberB.draw = function(ctx, x, y, num,center,offset) {
    num = num.toString();

    var step = this.width + 2;
    // 让分数剧中
    if(center){
      x=center-(num.length*step-2)/2;
    }
    //
    if(offset){
      x+=step*(offset-num.length);
    }

    for (var i = 0, len = num.length; i < len; i++) {
      var n = parseInt(num[i]);
      ctx.drawImage(img, step*n, this.y, this.width, this.height,
        x, y, this.width, this.height)
      x += step;
    }
  }
}

// 全局变量
var
  canvas,		// 面板
  ctx,		// 内容
  width,
  height,

  fgpos=0,
  frames=0,	// 计数器
  score=0,	// 等分
  best=0,		// 最高得分
  currentstate,	// 当前状态
  gameStatus={
    Splash:0,	// 准备游戏
    Game:1,		// 游戏中
    Score:2		// 得分
  },
  okbtn,
  // 小鸟
  bird={
    x:80,
    y:0,
    frame:0,		// 小鸟形态的index
    velocity:0,		// 向下掉的速度
    animation:[0,1,2,1],	// 小鸟的index集合
    rotation:0,
    gravity:0.25,		// 加速度
    radius:12,		// 作为判断是否撞上的小鸟区域
    _jump:4.6,

    // 跳跃
    jump:function () {
      this.velocity=-this._jump;
    },

    update:function () {
      // 通过计时器计算小鸟的状态index
      var n=currentstate===gameStatus.Splash?10:5;
      this.frame+=frames%n===0?1:0;
      this.frame%=this.animation.length;

      // 当是飞行状态   小鸟上下飞行
      if(currentstate===gameStatus.Splash){
        this.y=height-280+5*Math.cos(frames/10);
      }else{
        // 自由落体
        this.velocity+=this.gravity;	// 增加速度
        this.y+=this.velocity;	// 向下落

        // 如果落到底
        if(this.y>=height-s_fg.height-10){
          this.y=height-s_fg.height-10;
          if(currentstate===gameStatus.Game){
            currentstate=gameStatus.Score;
          }
          this.velocity=this._jump;
        }
        // 如果小鸟的速度过大 ，形态，小鸟的方向变化
        if(this.velocity>=this._jump){
          // 小鸟的形态
          this.frame=1;
          this.rotation=Math.min(Math.PI/2,this.rotation+0.3);
        }else{
          this.rotation=-0.3;
        }
      }
    },

    // 画小鸟
    draw:function (ctx) {
      // 保存当前的状态
      ctx.save();
      // 重新映射画布上(0,0)的位置
      ctx.translate(this.x,this.y);
      // 画布的旋转朝向
      ctx.rotate(this.rotation);
      var n=this.animation[this.frame];	// 当前小鸟的index
      s_bird[n].draw(ctx,-s_bird[n].width/2,-s_bird[n].height/2);
      ctx.restore();	// 恢复到之前默认状态
    }

  },

  // 障碍物
  pipes={
    _pipes:[],
    // 重置障碍物列表
    reset:function () {
      this._pipes=[];
    },
    // 更新
    update:function () {
      // 间隔触发
      if(frames % 100===0){
        var _y=height-(s_pipeSouth.height+s_fg.height+120+200*Math.random());
        this._pipes.push({
          x:500,
          y:_y,
          width:s_pipeSouth.width,
          height:s_pipeSouth.height
        });
      }
      // 每个障碍物向左移动
      for(var i=0,len=this._pipes.length;i<len;i++){
        var p = this._pipes[i];
        // 判断撞上障碍物，通过判断鸟距离边界的方形面积与小鸟圆形面积做比较
        if(i===0){
          // 计算游戏得分
          score+=p.x===bird.x?1:0;

          // 1.如果小鸟在左边，拿到障碍物的最左边x坐标
          var cx=Math.min(Math.max(bird.x,p.x),p.x+p.width);
          var cy1=Math.min(Math.max(bird.y,p.y),p.y+p.height);
          var cy2=Math.min(Math.max(bird.y,p.y+p.height+80),p.y+2*p.height+80);

          var dx=bird.x-cx;
          var dy1=bird.y-cy1;
          var dy2=bird.y-cy2;

          var d1=dx*dx+dy1*dy1;
          var d2=dx*dx+dy2*dy2;
          var r=bird.radius*bird.radius;

          if(r>d1||r>d2){
            currentstate=gameStatus.Score;
          }


        }

        // 向左移动
        p.x-=2;
        // 障碍物消失
        if(p.x<-50){
          this._pipes.splice(i,1);
          i--;
          len--;
        }
      }
    },
    draw:function (ctx) {
      for(var i=0,len=this._pipes.length;i<len;i++){
        var p=this._pipes[i];
        s_pipeSouth.draw(ctx,p.x,p.y);
        s_pipeNorth.draw(ctx,p.x,p.y+80+p.height);
      }
    }
  };


// 加载完后执行 初始化方法
window.onload=function () {
  main();
}


// 点击事件
function onpress(evt) {

  switch(currentstate){
    case gameStatus.Splash:
      currentstate=gameStatus.Game;
      bird.jump();
      break;
    case gameStatus.Game:
      bird.jump();
      break;
    case gameStatus.Score:
      var mx=evt.offsetX,my=evt.offsetY;
      // 兼容手机端
      if(mx==null||my==null){
        mx=evt.touches[0].clientX;
        my=evt.touches[0].clientY;
      }
      // 判断点击区域在button
      if(okbtn.x<mx&&mx<okbtn.x+okbtn.width&&okbtn.y<my&&my<okbtn.y+okbtn.height){
        pipes.reset();
        currentstate=gameStatus.Splash;
        score=0;
      }
      break;
  }
}

// 初始化方法
function main() {
  // console.log("aaastr:",aaastr);
  // canvas=document.createElement("canvas");
  canvas=document.getElementById("gamemain");
  console.log("canvas:",canvas);
  width=window.innerWidth;
  height=window.innerHeight;

  // 监听事件的类型
  var evt="touchstart";
  if(width>=500){
    width=320;
    height=480;
    canvas.style.border="1px solid #000";
    evt="mousedown";
  }
  document.addEventListener(evt,onpress);

  // 设置当前的游戏状态
  currentstate=gameStatus.Splash;
  // 添加canvas
  canvas.width=width;
  canvas.height=height;
  // canvas.width=750;
  // canvas.height=1334;
  ctx=canvas.getContext("2d");
  // document.body.appendChild(canvas);

  // 添加图片
  var img=new Image();
  img.onload=function () {
    console.log("onload");
    // debugger
    // 初始化游戏对象
    initSprites(img);
    // 设置背景颜色
    console.log("s_bg:",s_bg);
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
  img.src=require('../../assets/sheet.png');
    // img.src=require("./static/sheet.png");
}

// 开始游戏
function run() {
  var loop=function () {
    update();
    render();
    window.requestAnimationFrame(loop,canvas);
  }
  window.requestAnimationFrame(loop,canvas);
}

// 更新一些状态和坐标点
function update() {
  frames++;
  // 背景区域
  if(currentstate!==gameStatus.Score){
    fgpos=(fgpos-2 )%14;
  } // 如果游戏结束记录最大分数
  else{
    best=Math.max(best,score);
  }

  // 更新障碍物
  if(currentstate===gameStatus.Game){
    pipes.update();
  }

//		console.log(fgpos);
  // 更新鸟
  bird.update();
}

// 渲染
function render() {
  // 渲染背景颜色
  ctx.fillRect(0,0,width,height);
  // 渲染背景图片
  s_bg.draw(ctx,0,height-s_bg.height);
  s_bg.draw(ctx,s_bg.width,height-s_bg.height);

  // 渲染小鸟，障碍物
  bird.draw(ctx);
  pipes.draw(ctx);

  // 游戏区域
  s_fg.draw(ctx,fgpos,height-s_fg.height);
  s_fg.draw(ctx,fgpos+s_fg.width,height-s_fg.height);

  var width2=width/2;

  // 如果状态是准备游戏
  if(currentstate===gameStatus.Splash){
    // 显示操作提示
    s_splash.draw(ctx,width2-s_splash.width/2,height-300);
    // 文本提示
    s_text.GetReady.draw(ctx,width2-s_text.GetReady.width/2,height-380);
  }
  // 如果游戏结束
  if(currentstate===gameStatus.Score){
    s_text.GameOver.draw(ctx,width2-s_text.GameOver.width/2,height-400);
    s_score.draw(ctx,width2-s_score.width/2,height-340);
    s_buttons.Ok.draw(ctx,okbtn.x,okbtn.y);
    // 游戏结束时  显示当前得分和历史最好得分
    s_numberS.draw(ctx,width2-47,height-304,score,null,10);
    s_numberS.draw(ctx,width2-47,height-262,best,null,10);
  }else{
    s_numberB.draw(ctx,null,20,score,width2);
  }
}
