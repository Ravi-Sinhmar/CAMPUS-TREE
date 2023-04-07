
/*
routes:
1.Get /story for displaying story page and user's name and profile picture i.e login 
2.Post ./other_users == other user profile who uploaded story

*/

const router = require("express").Router();
const register = require("../models/registers");
const cloudinary = require("cloudinary");
const story_model = require("../models/story");
// const teams=require("../models/team");
const auth = require("../middleware/auth");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});


//for getting story page
router.get("/announcement", auth,async (req, res) => {
  const me = await register.findOne({ _id: req.cookies.id });
console.log(me);


  res.render("story",{profile_image:me.profile_image,name:me.full_name,userid:me.user_id});
});



//window onload for sending other user story
router.post("/other_users",async(req,res)=>{
  try{

    let all_stories=[];

    //applying on condition when story is grreater than 0
    const other_user_story = await register
  .find({ _id: { $ne: req.cookies.id }, stories: { $gt: 0 } })
  .sort({ lastUpdated: 1 });


   // console.log(other_user_story);
    other_user_story.forEach((data)=>{
      all_stories.push({fullname:data.full_name,profile_image:data.profile_image,user_id:data.user_id})
    })
    res.send(all_stories);
  }catch(err){
console.log(err);
  }
})






//uploading stories

router.post("/stories", async (req, res) => {
  try {
  //

   // console.log("jhello");
    const { image } = req.body.image;
    console.log("Hey!");

    //  cloudinary.v2.uploader
    //  // .upload("audio_sample.mp3",
    //  //   { resource_type: "video" })
    //  // .then(result=>console.log(result));

    let urll = "";
    const re = cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    re.then(async (data) => {
      //console.log(data);
      //console.log(data.secure_url);
      urll = data.secure_url;

      if (data.secure_url) {
        const user = await story_model.findOne({
          user_id: req.cookies.user_id,
        });
        //console.log(user);
        let obj = {
          url: urll,
        };
        
//function
let increment=async()=>{
  const result = await register.findOneAndUpdate(
    { "_id" : req.cookies.id }, //also you can search for id
    { $inc: { "stories" : 1 } },{returnNewDocument: true}

 )
 



  
 console.log(result);

}



        if (user) {
          await user.allstories.push(obj);
            

              if(await user.save()){
                console.log(user);
                increment();
              }
        
          



          
        } else {
          const new_user_story = await new story_model({
            user_id: req.cookies.user_id,
            allstories: {
              url: urll,
            },
          });
          await new_user_story.save();
          if(new_user_story){
             increment();
          }else{
            res.send({"status":false,message:"Something went wrong try again later"});

          }
         

        }
            


            
       
res.send({"status":"oksy"});


       

        

      }
    }).catch(async(err) => {
      console.log(err);
      res.send({"status":false,message:"Something went wrong try again later"});
    });
  } catch (err) {
    console.log(err);
    res.send({"status":false,message:"Something went wrong try again later"});

  }
});





//seeing user's story

router.post("/see_stories",async(req,res)=>{
try{

 const user=await story_model.findOne({user_id:req.body.userid});
 if(user){
  console.log(user);
  res.send(user.allstories);
 } else{
   res.send({message:"no user found"});
 }
 

}catch(err){
console.log(err);
}
});


router.post("/notice",async(req,res)=>{
  try{
    let total_challenges;
   // console.log("hey!");
    //to find all user expect and team is greater than 0
    const user = await teams.find({
      user_id: { $ne: req.cookies.user_id },
      teams: { $exists: true, $not: { $size: 0 } }
    });
  console.log(user);

  res.send(user);
  
  }catch(err){
  console.log(err);
  }
})
module.exports = router;




//   router.get("/story",async(req,res)=>{

//  res.render("story");
// });

// //upload story

// router.post("/stories",async(req,res)=>{
//   //     try{

//        const {image}=req.body.image;
//            //find user

//            //upload

//   //          cloudinary.v2.uploader
//   // .upload("audio_sample.mp3",
//   //   { resource_type: "video" })
//   // .then(result=>console.log(result));

//        const re = cloudinary.uploader.upload(req.body.image, {public_id: "881"});
//        re.then(async(data) => {
//             console.log(data);
//             console.log(data.secure_url);
//             const one_story={
//               url:data.secure_url,
//               typee:"jjjjj"

//             }
//             const user=await register.findOne({_id:req.cookies.id});
//             await user.story_image.push(one_story);

//             user.save();
//             console.log(user.story_image);
//             console.log(user);
//             res.json({success:true});

//        }).catch((err)=>{
//    console.log(err);
//    res.json({success:false,error:"Network problem"});
//        });

//       }catch(err){
//         console.log(err);
//         res.json({success:false,error:"Network problem"});

//       }

//       });