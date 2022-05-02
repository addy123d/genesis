const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
        email:{
            type:String,
            required:true
        },
        transaction:{
            type:String,
            required:true
        }
})

module.exports = transactionRegister = mongoose.model("transactionRegister",transactionSchema);