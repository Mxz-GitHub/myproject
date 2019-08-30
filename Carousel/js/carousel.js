(function(DURATION,interval,LICOUNT){
  console.log("引入成功")
  console.log(DURATION,interval,LICOUNT)
//轮播图
var ulImgs=document.getElementById("ul-imgs");
var ulIdxs=document.getElementById("ul-idxs");
var carousel=document.getElementById("carousel");
var before=document.getElementById("before");
var after=document.getElementById("after");
var idxsList=ulIdxs.children;
var i=0;//表示正在显示第几张图片 从0开始
var LIWIDTH=1000;//每个li固定宽度
// var DURATION=500;//每次轮播动画的持续时间
// var interval=3000;//自动轮播动画持续时间
// var LICOUNT=4;//轮播图片数量

//移动至范围内的图片
function moveTo(to){
  //如果没有传入跳转哪里 就默认跳转至下一张
  if(to==undefined){
    to=i+1;
  };
  //如果从头开始则重新加上transition
  if(i==0){
    if(to>i){//想看右边的图片 
      ulImgs.className="transition";
    }else{//i=0 且想要看左侧的图片
      //去掉class transition 并且将ulImage拉至最左侧
      ulImgs.className="";
      ulImgs.style.marginLeft=-LIWIDTH*LICOUNT+"px";
      setTimeout(function(){
        moveTo(LICOUNT-1);
      },100);
      return;
    };
  };
  i=to;
  //计算ul-imgs的margin-left
  ulImgs.style.marginLeft=-i*LIWIDTH+"px";
  //删除所有小圆点的class
  for(var li of idxsList){
    li.className="";
  };
  if(i==LICOUNT){
    i=0;
    setTimeout(function(){
      ulImgs.className="";
      ulImgs.style.marginLeft=0;
    },DURATION);
  };
  idxsList[i].className="active";
}

//按钮绑定事件
var canClick=true;//避免用户多次点击触发多次动画效果
//两个按钮公用的移动函数，n为1时，移动到i+1的位置即左移。n为-1是，移动到i-1的位置即右移
function move(n){
  if(canClick){
    moveTo(i+n);
    canClick=false;
    //设置等待时间，当本次动画效果执行完后，才打开开关
    setTimeout(function(){
      canClick=true;
    },DURATION+100);
  };
};
//右移
after.onclick=function(){
  move(1);
};
//左移
before.onclick=function(){
  move(-1);
};

//自动轮播及鼠标移入移出
var timer=setInterval(function(){
  moveTo();
},interval)
carousel.onmouseover=function(){
  clearInterval(timer)
};
carousel.onmouseout=function(){
  timer=setInterval(function(){
    moveTo();
  },interval);
};

//下方小圆点
ulIdxs.onclick=function(e){
  if(canClick){
    var li=e.target;
    if(li.nodeName=="LI"){//获得LI元素的节点
      if(li.className!=="active"){
        for(var i=0;i<idxsList.length;i++){
          if(idxsList[i]==li){
            break;
          };
        };
        moveTo(i);
        setTimeout(function(){
          canClick=true;
        },DURATION);
      };
    };  
  };
};
})(DURATION,interval,LICOUNT)
