var mongoose = require('mongoose');  
var doctorSchema = new mongoose.Schema({  
    firstName: String,
    lastName: String,
    dob: { type: Date },
    email: String,
    userType:{type:String,default:"doctor"},
    password:String,
    mobile:Number,
    address:String,
    gender:String
});
mongoose.model('doctor', doctorSchema,'doctor');