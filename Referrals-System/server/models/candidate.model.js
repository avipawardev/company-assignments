const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  jobTitle: {type:String,enum:['SDE','Backend','Frontend','IA']},
  status: {type:String,enum:["Pending","Reviewed","Hired"],default:"Pending"},
  resumeUrl:String,
  referredBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

const candidatesModel = mongoose.model('Candidate',candidatesSchema);
module.exports = candidatesModel;
