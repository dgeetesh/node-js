var mongoose = require('mongoose');  
var appointmentSchema = new mongoose.Schema({  
    pateintName: String,
    pateintEmailId: String,
    message:String,
    doctorId:String,
    day:Date,
    approve:{type:Boolean,default:false}
});
mongoose.model('appointment', appointmentSchema,'appointment');