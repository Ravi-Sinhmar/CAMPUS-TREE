
const profile=require("express").Router();
const register=require("../models/registers");
const auth=require("../middleware/auth");
const cloudinary=require("cloudinary");
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });


//pta nhii bhai tune yha kya kr rkha



profile.get("/edit-profile",auth,async(req,res)=>{
  try{ 
     // console.log("helllo");

    
       const user=await register.findOne({user_id:req.cookies.user_id});
    if(user){
        //console.log(user);
        let basic_info={
           fullname:user.full_name, 
           user_id:user.user_id,
           college:user.college,
           city:user.city, 
           email:user.email,
           interest:user.interest,
           about:user.about,
           profile:user.profile_image

        }
        //console.log(basic_info);

res.render("edit_profile",{data:basic_info});
    }}catch(err){
        console.log(err);
    };
});



//specific user

profile.get("/user/:user_id",auth,async(req,res)=>{
    const user=await register.findOne({user_id:req.params['user_id']}); 
    if(user){
        res.render("otherprofile",{interest:user.interest,about:user.about,fullname:user.full_name ,userid:user.user_id,email:user.email,city:user.city,college:user.college,profile_image:user.profile_image,cover_image:user.cover_image});
    }else{
        res.send("error");
    }
})


profile.post("/edit_profile",async(req,res)=>{

    try{
        console.log(req.body);
       // console.log(req.body.fullname);
       const {fullname,userid,email,interest,aboutInput,city,college}=req.body;
//console.log(req.body);




//console.log(interest_arr);
       const update={
          full_name:fullname,
          user_id:userid,
          college:college,
             city:city,
             about:aboutInput,
             interest:interest
            
          
       }
      // console.log(update);
     const u= await register.findOneAndUpdate({user_id:req.cookies.user_id}, update, {

    });
if(u){
    res.redirect("/myprofile");
}
    console.log("hello");
   // console.log(u);
    //await register.save();
    
      

    }catch(err){
        console.log(err);
        res.redirect("/edit-profile");
    }
//console.log(req.body);
})

profile.get("/myprofile",auth,async(req,res)=>{     //rending my profil
  
  
    const user=await register.findOne({user_id:req.cookies.user_id});
     if(user){
         console.log(user.about);
        //  let basic_info={
        //      fullname:user.full_name,
        //      user_id:user.user_id,
        //      college:user.college,
        //      city:user.city,
        //      email:user.email
        //  }
         res.status(200).render("myprofile",{interest:user.interest,about:user.about,fullname:user.full_name ,userid:user.user_id,email:user.email,city:user.city,college:user.college,profile_image:user.profile_image,cover_image:user.cover_image});
     }else{
         res.send("error");     }
   
})


profile.post("/upload_cover",async(req,res)=>{    //upload story
  
    
    //console.log(req.body);
//console.log(req.body.client_url);

//object destructing
const url=req.body;

    const qq = cloudinary.uploader.upload(url.client_url, {public_id: Date.now()});
qq.then(async(data)=>{


//update db 

//find the user
const update={cover_image:data.secure_url};
const user=await register.findOneAndUpdate({_id:req.cookies_user_id}, update, {

});

if(user){
    
    res.send({"success":true,"image_url":data.secure_url});

}
else{
    res.send({"status":false,"message":"Upload failed","title":"Internal"});
}

}).catch((err)=>{console.log(err)

    res.send({"status":false,"message":"Upload failed","title":"Internal"});

});



    
});

profile.post("/upload_profile",async(req,res)=>{

    const url=req.body;
    const qe = cloudinary.uploader.upload(url.url_data, {public_id: Date.now()});
qe.then(async(data)=>{
console.log(data.secure_url);

//update db 

//find the user
const update={profile_image:data.secure_url};
const user=await register.findOneAndUpdate({user_id:req.cookies.user_id}, update, {

});

if(user){
    console.log(user);
    res.send({"success":true,"image_url":data.secure_url});
    
}
else{
    res.send({"status":false,"message":"Upload failed","title":"Internal"});
}

}).catch((err)=>{console.log(err) ;   
    res.send({"status":false,"message":"Upload failed","title":"Internal"});
});


})
// profile.get("/profile",auth,async(req,res)=>{
//     try{
//     const otherUsers=await register.find({});
//      console.log(otherUsers);
//       // console.log(auth);
// console.log(req.data);
//         res.render("profile",{user:req.data,otherUsers:otherUsers});
//     }
//    catch(err){
//        console.log(err);
//        res.send(err);
//    } 
// })


profile.post("/other_profile",async(req,res)=>{

    try{
        console.log("hehe");
const user=await register.find();
console.log("hello"+user);
if(user){
let data=[];   

    const details=user.forEach((ele)=>{
             data.push({fullname:ele.full_name,user_id:ele.user_id,college:ele.college,about:ele.about,profile_image:ele.profile_image});

    })
res.send(data);
}}catch(err){
    console.log(err);
}
// console.log(user);

});

profile.get("/allUser",auth,(req,res)=>{
res.render("all_user");
})


module.exports=profile;
