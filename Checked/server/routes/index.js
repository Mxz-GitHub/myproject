var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var uX=req.query.uX;
  var oX=req.query.oX;
  if(uX-3<oX && oX<uX+3){
    res.send({code:1,msg:"验证通过"});
  }else{
    res.send({code:0,msg:"验证失败"});
  }
});

module.exports = router;
