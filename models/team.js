const mongoose=require("mongoose");
const TeamSchema = new mongoose.Schema({
user_id:{
type:String
},name:{
type:String
},
teams:[{
    heading:{
        type:String
    },project_detail:{
type:String
    },total_members:{
        type:Number
    },project_type:{
        type:String
    },contact_link:{
        type:String
    }
    
        
    }]
});


module.exports=new mongoose.model("team_dummy",TeamSchema );