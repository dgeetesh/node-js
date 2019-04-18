var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({  
  firstName: String,
  lastName: String,
  dob: { type: Date },
  email: String,
  userType:{type:String},
  password:String,
  mobile:Number,
  address:String,
  gender:String,
  status:{type:String,default:"2"},
  image:String,
//for doctors
  degree:String,
  experience:Number,
  speciality:String,
});
mongoose.model('users', userSchema,'users');