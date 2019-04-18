var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  if(req.body.email && req.body.password)
  {

    mongoose.model('users').find({$and:[{email:req.body.email},{password:req.body.password}]}, function (err, userResult) {
      console.log("userResult ",userResult);
      if(userResult.length>0)
      {
        res.send({message:"Successfylly login",userResult:userResult,successcode:true});

      }else
      {
        res.send({message:"Wrong username and password",successcode:false});

      }

  
  });


  }else
  {
    res.send({message:"variable is empty",successcode:false});

  }


});



module.exports = router;
