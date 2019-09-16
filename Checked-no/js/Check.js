//图片滑动验证
$.fn.imgcode=function(options){
	//初始化参数
	var defaults={
		callback:''
	};
	var opts=$.extend(defaults,options);
	return this.each(function(){
		//定义拖动参数
		var $moveBtn=$(this).find('.btn-code');//拖动按钮
		var $moveMouse=$(this).find('.btn');//鼠标可拖拽区域
		var mX=0,mY=0;//定义鼠标位置
		var dX=0,dY=0;//定义滑动区域位置
		var isDown=false;//鼠标按下开关
		var nowTimes=0;//点击是当前时间
		var onTimes=0;//松手验证时当前时间
		//按钮拖动
		$moveBtn.on({
			//鼠标按下
			mousedown:function(){
				dX=$moveMouse.offset().left;
				dY=$moveMouse.offset().top;
				isDown=true;
				//按下获取当前时间
				var start=new Date()
				onTimes=start.getTime();
			}
		});
		//鼠标点击松手
		$(document).mouseup(function(){
			var lastX=$('.onimg').offset().left-dX;
			isDown=false;
			$moveBtn.remove('active');
			var end=new Date()
			nowTimes=end.getTime();
			checked(lastX);
		});
		//滑动事件
		$moveMouse.mousemove(function(e){
			var ev=e || window.event;
			var x=ev.pageX;//鼠标滑动时的X轴
      if (isDown) {
        if(x>(dX+30) && x<dX+$(this).width()-20){
					$moveBtn.css({"left": (x - dX - 20) + "px"});//div动态位置赋值
					$(".onimg").css({"left": (x - dX-20) + "px"});
        };
      };
		});
		//底部滑块位置及背景图片
		$('.refresh-img').click(function(){
			img();
		});
		window.onload=function(){
			img()
		}
		function img(){
			var iX=$('.onimg-pos').offset().left;
			if(iX>=$moveMouse.offset().left && iX<$moveMouse.offset().left+218){
				var src='./img/'+parseInt(Math.random()*11)+'.png';
				$('.onimg-pos').css("margin-left",(parseInt(Math.random()*158)+60)+'px');
				$('.check').css("background-image","url("+src+")");
				$('.onimg').css({"left":0});
				$moveBtn.css({"left":0});
			};
		}
		//数据验证

		//采用定时器模拟ajax
		function checked(lastX){
			//获取图片中心点的位置
			var uX=$('.onimg-pos').offset().left-dX+30;
			var uY=$('.onimg-pos').offset().top-dY-30;
			//上方图片
			var oX=lastX+30;
			var oY=$('.onimg').offset().top-dY-30;
			var Time=(nowTimes-onTimes)/1000;
			if(uX-3<oX && oX<uX+3){
				$('.refresh-text').html("验证通过").css({"display":"inline","color":"#0f0"});
				$('.refresh-time').html('验证完成用时'+Time.toFixed(1)+'s').css({"display":"inline","color":"#0f0"});
				setTimeout(function(){
					$('#box').remove();
				},1000);
			}else{
				$('.refresh-text').css("display","inline");
				setTimeout(function(){
					window.location.reload();
				},1000);
			};
		};
	});
};
