const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    clgaddr:{
        type:String,
        required:true
    },
    projname:{
        type:String,
        required:true
    },
    projguide:{
        type:String,
        required:true
    },
    guidenumber:{
        type:String,
        required:true
    },
    projdescription:{
        type:String,
        required:true
    },
    projrequire:{
        type:String,
        required:true
    }
})

module.exports = studentRegister = mongoose.model("studentRegister",studentSchema);