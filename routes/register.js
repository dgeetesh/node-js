var express = require('express');
var router = express.Router();
var users = require('../model/users_model');
var mongoose = require('mongoose');



router.route('/userregister1').
get( function(req, res, next) {

    console.log("asdas");
});


router.route('/userregister').
post( function(req, res, next) {

    console.log("userResult ");

        // mongoose.model('users').find({}, function (err, userResult) {
        //     console.log("userResult ",userResult);
        
        // });
        if(req.body.firstName && req.body.lastName &&req.body.email &&req.body.password &&req.body.address&&req.body.dob&&req.body.dob)
{
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var password = req.body.password;
        var mobile = req.body.mobile;
        var address = req.body.address;
        var gender = req.body.gender;
        var dob = req.body.dob;
        console.log("firstName ",firstName);

        mongoose.model('users').create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            mobile : mobile,
            address : address,
            gender : gender,
            dob : dob,
            userType:"user"

        }, function (err, result) {
// console.log("result",result);
res.send({message:"User Registered succesfully",successcode:true});
        });
    }else
    {
        res.send({message:"variable is empty",successcode:false});
    }
//   res.send('respond with a resource');
});

module.exports = router;
