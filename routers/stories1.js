const router=require("express").Router();
const register=require("../models/registers");
const cloudinary=require("cloudinary");
const auth=require("../middleware/auth");
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
  router.get("/announcement",auth,async(req,res)=>{
 res.render("story");
});




module.exports=router;