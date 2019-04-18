var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  console.log(req.body);
  if(req.body.email && req.body.password)
  {

    mongoose.model('users').find({$and:[{email:req.body.email},{password:req.body.password}]}, function (err, userResult) {
      console.log("userResult ",userResult);
      if(userResult.length>0)
      {
        if(userResult[0].approval == true)
        {
          mongoose.model('users').update({$and:[{email:req.body.email},{password:req.body.password}]},{$set:{status:"1"}}, function (err, userResultupdate) {

          });
  
          res.send({message:"Successfylly login",userResult:userResult,successcode:true});
  
        }else
        {
          res.send({message:"Permissioen denied",successcode:false});
        }
       
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


router.post('/logout', function(req, res, next) {
  if(req.body.email)
  {

    mongoose.model('users').find({$and:[{email:req.body.email}]}, function (err, userResult) {
      console.log("userResult ",userResult);
      if(userResult.length>0)
      {
        mongoose.model('users').update({$and:[{email:req.body.email}]},{$set:{status:"2"}}, function (err, userResultupdate) {

        });

        res.send({message:"Successfylly logout",userResult:userResult,successcode:true});

      }else
      {
        res.send({message:"data not found",successcode:false});

      }

  
  });


  }else
  {
    res.send({message:"variable is empty",successcode:false});

  }


});



module.exports = router;
