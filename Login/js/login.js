//引入sha1.js加密文件
console.log("引入成功")
//登录页面js操作
$('.ord').click(function(){
  if($('#login_ord').css('display')=='none'){
    $('#login_two').css('display','none');
    $('.two').css('background','#89caf4');
    $('#login_ord').css('display','block');
    $('.ord').css('background','#e1f2fc');
  }
})
$('.two').click(function(){
  if($('#login_two').css('display')=='none'){
    $('#login_ord').css('display','none');
    $('.ord').css('background','#89caf4');
    $('#login_two').css('display','block');
    $('.two').css('background','#e1f2fc');
  }
})

//密码验证
$('#btn').click(function(){
  var value=$('#upwd').val();
  if(value){
    //console.log(value)
    var sha = hex_sha1(value);
    console.log(sha)
  }else{
    alert("密码不能为空")
  }
});
