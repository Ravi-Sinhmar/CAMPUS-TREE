const mongoose = require("mongoose");

const hackathonSchema= mongoose.Schema({
user_id:{
    type:String,
    required:true
},
name:{
type:String,
required:true
},
hackathon_detail:[{
    hackathon_name:{
type:String
},location:{
type:String
},description:{
type:String
},
type:{   //public private
type:String
},
prize:{
    ist:{
type:Number
    },second:{
        type:Number
    },third:{
        type:Number
    }
    
},fees:{
    type:Number
},
contact_link:{
    type:String
},hackathon_link:{
    type:String
}


}]

});



module.exports=new mongoose.model("hackathon_dummy",hackathonSchema);