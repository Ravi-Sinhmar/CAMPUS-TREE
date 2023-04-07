
//--
const mongoose = require("mongoose");

const challengesSchema= mongoose.Schema({
user_id:{
type:String
},
name:{
type:String
},
challenges_detail:[{


challenge_name:{
type:String
},description:{
type:String
},
type:{
type:String,
},link:{
    type:String
}

}],members:[{
name:{
    type:String,
    
},user_id:{
    type:String
}
}]

});



module.exports=new mongoose.model("challenges",challengesSchema);