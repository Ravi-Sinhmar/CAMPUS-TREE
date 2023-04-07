
const mongoose = require("mongoose");
const aChatSchema = mongoose.Schema({
   chat_id:{
    type:String,
    required:true
   },
  
   message:[{
    sentby:{
        type:String,
        required:true
    },
    chat:{
        type:String,
        required:true
    },
    chat_name:{
        type:String,
        required:true
    }

   }]
});
module.exports=new mongoose.model("yourchat",aChatSchema); 