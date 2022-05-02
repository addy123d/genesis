const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
        email:{
            type:String,
            required:true
        },
        reply1:{
            type:String,
          
        },
        reply2:{
            type:String,
     
        },
        list:{
            type:String
        },
        reply3:{
            type:String,
       
        }
})

module.exports = questionRegister = mongoose.model("questionRegister",questionSchema);