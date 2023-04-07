const router=require("express").Router();
const register=require("../models/registers");
const cloudinary=require("cloudinary");
const auth=require("../middleware/auth");
require("dotenv").config();
//config cloudinary

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });
  router.get("/announcement", auth, function(req,res){
    res.render("story");
  });

// router.get("/story",auth,async(req,res)=>{

 
  
// const me=await register.findOne({_id:req.cookies.id});
// const user=await register.find({_id:{$ne:req.cookies.id}}).sort({"updatedAt":-1}).exec(    //decreasing prder
//    (err, data)=> {

//     //send images
// if(data){
//   console.log(data);
//   var other_profile=[];
// data.forEach((ele,index)=>{
// other_profile.push({});
//   console.log(ele.profile_image.url);
//   other_profile[index].url=ele.profile_image.url;
//   other_profile[index].name=ele.firstname+" "+ ele.lastname;
//   other_profile[index].email=ele.email;
//   other_profile[index].college=ele.college;
//   //other_profile[index].total_stories=ele.story_image.length;



// });
// console.log(other_profile);
// res.render("index",({data:other_profile}));
// }
// else{
//   console.log(err);
// }
  
//   }) ; 




// })
// router.get("/ksk",(req,res)=>{
// res.render("index");
// })

// router.post("/other_user_story",async(req,res)=>{
//   //find everything 
// const other_user=await register.find({$and: [{_id:{$ne:req.cookies.id}},
//                                   {story_image: { $exists: true, $not: {$size: 0} } } ]}).sort({"updatedAt":-1}).exec(    //decreasing prder
//                                       (err, data)=> {
//                                         if(data){
//                                         console.log(data);
//                                         let other_story=[];

//                                         data.forEach((ele,index)=>{
//                                           other_story.push({});
//                                           other_story[index].name=ele.firstname+ele.lastname;
//                                           other_story[index].story=ele.story_image;
                                          
                                          
//                                           console.log(ele.story_image);

//                                         });
//                                         res.send({other_story});
                                       
//                                       }else{
//                                         res.send({success:false,message:"Something went wrong",title:"Internal"});
//                                       }

//                                       });
                                    


                                   

// //extract name ,time ,stories,url
// console.log("hello");

// });


// router.get("/stories",auth,async(req,res)=>{
//   //find user
//   const profile_user=await register.findOne({_id:req.cookies.id});
//   const other_stories=await register.find({});
//       //here we have the know total no of stories uploaded
//       let total_users=other_stories.length-1;
//      //pass names
//      let name_other=[];
//      let obj_id;
//      other_stories.forEach((el,index)=>{
//      //  console.log(req.cookies.id,el._id);
    
//        if(el._id!=req.cookies.id){  //compare and access other user document 
//            name_other[index]= el.firstname;
//         console.log( el.firstname);}
//      })
//   if(profile_user)
//     res.render("story",{total_users,name_other});
    
//     })


//     router.post("/stories",async(req,res)=>{
//     try{
//         console.log("jhello");
//      const {image}=req.body.image;
//          //find user
         
        
//          //upload 

// //          cloudinary.v2.uploader
// // .upload("audio_sample.mp3", 
// //   { resource_type: "video" })
// // .then(result=>console.log(result));


//      const re = cloudinary.uploader.upload(req.body.image, {public_id: "881"});
//      re.then(async(data) => {
//           console.log(data);
//           console.log(data.secure_url);
//           const one_story={
//             url:data.secure_url,
//             typee:"jjjjj"
            
//           }
//           const user=await register.findOne({_id:req.cookies.id});
//           await user.story_image.push(one_story);



//           user.save();
//           console.log(user.story_image);
//           console.log(user);
//           res.json({success:true});

//      }).catch((err)=>{
//  console.log(err);
//  res.json({success:false,error:"Network problem"});
//      });


//     }catch(err){
//       console.log(err);
//       res.json({success:false,error:"Network problem"});
       
//     }
      
//     });




//    router.post("/see_stories",async(req,res)=>{
//      console.log(req.body);
//      if(req.body.own_story==true){
//             const user=await register.findOne({_id:req.cookies.id});
//             if(await user){
//               console.log(user.story_image);
//             }
//                await 
//                res.send(user.story_image);

//      }
//    })







//     router.post("/see",(req,res)=>{
//       const user=registermodel.findOne({_id:req.cookies.id});
//       if(user){

//       }
//     });

//     router.post("/ownstories",async (req,res)=>{
//       const user=await register.findOne({_id:req.cookies.id});
//       let file=[];
//       if(user){
//         user.story_image.forEach((ele,index)=>{   
//          file[index]=ele.url;


//         })
//         res.json(file);
        
//       }
       
//     });
//     router.get("/see",async()=>{
// const user=await register.findOne({email:"12343msmdm@gmail.com"});


// user.date=new Date().toLocaleString();
// console.log(user);

//     })
//     module.exports=router;

