var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var appointment = require('../model/appointment_model');

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

router.route('/doctorLocationAndType').
post( function(req, res, next) { 

  mongoose.model('users').find({userType:"doctor"},{address:1,speciality:1}, function (err, userResult) {
if(userResult.length>0)
{
  console.log("userResult ",userResult);

  res.send({message:"Doctors List",userResult:userResult,successcode:true});

}else
{
  res.send({message:"Doctors list not found",successcode:false});

}
    
        }); 
});

router.route('/bookappointment').
post( function(req, res, next) {
  if(req.body.pateintName && req.body.pateintEmailId && req.body.doctorId)
  {
    mongoose.model('appointment').find({
    },function(err, result){
console.log("result",result);

    });
var pateintName=req.body.pateintName;
var pateintEmailId=req.body.pateintEmailId;
var doctorId=req.body.doctorId;
var message=req.body.message;

mongoose.model('appointment').create({
  pateintName : pateintName,
  pateintEmailId : pateintEmailId,
  doctorId : doctorId,
  message : message,

}, function (err, result) {
// console.log("result",result);
res.send({message:"Appointment Booked succesfully",successcode:true});
});
      }else
        {
          res.send({message:"variables are empty",successcode:false});
      
        }
});

router.route('/bookappointmentlist').
post( function(req, res, next) {
  if(req.body.doctorId)
  {
    mongoose.model('appointment').find({doctorId:req.body.doctorId
    },function(err, result){
      if(result.length>0)
      {
        res.send({message:"Booked Appointment",result:result,successcode:true});

      }else
      {
        res.send({message:"No booked appointment",successcode:false});
      }
// console.log("result",result);
});
      }else
        {
          res.send({message:"variables are empty",successcode:false});
      
        }
});
var nodemailer = require('nodemailer');

router.route('/bookappointmentapproval').
post( function(req, res, next) {
  if(req.body.approve && req.body.pateintEmailId)
  {
mongoose.model('users').find({email:req.body.pateintEmailId
}, function (err, result) {
// console.log("result",result);

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    mongoose.model('appointment').update({email:req.body.pateintEmailId
    },{$set:{approve:req.body.approve}}, function (err, result) {
    
    });

    res.send({message:"your Appointment has been approve :"+req.body.approve,successcode:true});

    console.log('Message sent: ' + info.response);
});


});
      }else
        {
          res.send({message:"variables are empty",successcode:false});
      
        }


});


router.route('/bookappointmentapproval1').
post( function(req, res, next) {
//   if(req.body.approve && req.body.pateintEmailId)
//   {
// mongoose.model('users').find({email:req.body.pateintEmailId
// }, function (err, result) {
console.log("result");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dgeetesh99@gmail.com',
    pass: '20209090geetesh'
  },
  tls: {
    rejectUnauthorized: false
}
});

var mailOptions = {
  from: 'dgeetesh99@gmail.com',
  to: 'minakshimukati10@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    // mongoose.model('appointment').update({email:req.body.pateintEmailId
    // },{$set:{approve:req.body.approve}}, function (err, result) {
    
    // });
    console.log('Message sent: ' + info.response);
    res.send({message:"your Appointment has been approve :"+req.body.approve,successcode:true});

    // console.log('Message sent: ' + info.response);
});


// });
      // }else
      //   {
      //     res.send({message:"variables are empty",successcode:false});
      
      //   }


});
module.exports = router;
