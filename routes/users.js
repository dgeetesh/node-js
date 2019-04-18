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

router.route('/bookappointment').
post( function(req, res, next) {
  if(req.body.pateintName && req.body.pateintEmailId && req.body.doctorId && req.body.day)
  {
var pateintName=req.body.pateintName;
var pateintEmailId=req.body.pateintEmailId;
var doctorId=req.body.doctorId;
var day=req.body.day;

mongoose.model('users').create({
  pateintName : pateintName,
  pateintEmailId : pateintEmailId,
  doctorId : doctorId,
  day : day,

}, function (err, result) {
// console.log("result",result);
res.send({message:"Appointment Booked succesfully",successcode:true});
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
var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
    to: req.body.pateintEmailId, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
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

module.exports = router;
