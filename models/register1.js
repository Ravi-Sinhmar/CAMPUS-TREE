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
        type:String
    },email:{
        type:String,
        required:true,
        unique:true 
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
    },interest:[{skills:{
        type:String
    }}],
    
    about:{
        type:String
    }
    ,profile_image:{
      url:{
          type:String,
          default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      }
    },cover_image:{
        url:{
            type:String,
            default:"https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/05/faculty-default-cover-image-placeholder-.png"
        }
      },


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

module.exports=new mongoose.model("registers",registerSchema);