//for registering a user 
//Firstname 
//lastname
//email
//college 
//password
//city
//phone no
//intrest 
//agr kuch or bhi add krna ho to bta dena 

const mongoose=require("mongoose");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const registerSchema = new mongoose.Schema({

    full_name:{
       type:String,
       required:true
      
    },user_id:{
        type:String,
        unique:true
    },email:{
        type:String,
        required:true
    },city:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true 
    },password:{
        type:String,
        required:true 
    },interest:[{
        type:String
    }],
    stories:{
      type:Number,
      default:0
    },
    about:{
        type:String
    }
    ,profile_image:{
      
          type:String,
          default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      
    },teams:[{
        heading:{
            type:String
        },project_detail:{
type:String
        },total_members:{
            type:Number
        },project_type:{
            type:String
        }
        
            
        }]


},{timestamps:true});

registerSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      console.log(this.password);
      return next();
    } catch (err) {
      return next(err);
    }
  });

module.exports=new mongoose.model("registers_text",registerSchema);