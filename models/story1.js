
const mongoose = require("mongoose");
const storySchema = mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    allstories:[{
        url:{
            type:String,
            required:true
        },
        
            time : { type : Date, default: Date.now }

        }]
    });
module.exports=new mongoose.model("storie",storySchema); 