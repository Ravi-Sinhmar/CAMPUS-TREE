
const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
    user_id:{
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
        
    },{timestamps: true} );
module.exports=new mongoose.model("storiess",storySchema); 