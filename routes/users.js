var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.route('/filterDoctorList').
post( function(req, res, next) {
  if(req.body.location && req.body.types)
  {

 
var location=req.body.location;
var types=req.body.types;

  mongoose.model('users').find({$and:[{address:location},{speciality:types}]}, function (err, userResult) {
            console.log("userResult ",userResult);
   res.send({message:"Doctors List",userResult:userResult,successcode:true});

        }); 
      }else
        {
          res.send({message:"variables are empty",successcode:false});
      
        }


});

module.exports = router;
