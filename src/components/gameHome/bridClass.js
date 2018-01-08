
// 小鸟的类
function Bird() {
	this.x=80;
	this.y=0;
	this.frame=0;		// 小鸟形态的index
	this.velocity=0;		// 向下掉的速度
	this.animation=[0,1,2,1];	// 小鸟的index集合
	this.rotation=0;
	this.gravity=0.25;		// 加速度
	this.radius=12;		// 作为判断是否撞上的小鸟区域
	this._jump=4.6;
	this.initheight=280;

	// 跳跃
	this.jump=function () {
		this.velocity=-this._jump;
	}

	this.update=function () {
		// 通过计时器计算小鸟的状态index
		var n=currentstate===gameStatus.Splash?10:5;
		this.frame+=frames%n===0?1:0;
		this.frame%=this.animation.length;

		// 当是飞行状态   小鸟上下飞行
		if(currentstate===gameStatus.Splash){
			this.y=height-this.initheight+5*Math.cos(frames/10);
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
	}

	// 画小鸟
	this.draw=function (ctx) {
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
}
