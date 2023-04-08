

//createTeam,team
//addHackathon,hackathon
///addChallenges,challenges






//1.createTeam
//2.listing

//other 3 routes here
const router=require("express").Router();
const team=require("../models/team");
const hackathon=require("../models/hackathon");
const challenge_schema=require("../models/challenges")
const auth=require("../middleware/auth");


router.get("/createTeam",auth,(req,res)=>{
    res.render("makeTeam");
});

router.post("/create-team",async(req,res)=>{
    try{
        //console.log("helllo");
       const {heading,project_detail,teamMembers,projectType,contactLink}=req.body;
       const user=await team.findOne({user_id:req.cookies.user_id});
if(user){

   await  user.teams.push({
        heading:heading,
        project_detail:project_detail,
        total_members:teamMembers,
        project_type:projectType,
        contact_link:contactLink
    
    });
    await user.save();
    res.redirect("/team");
}else{
    
    const newww= await new team({
      user_id:req.cookies.user_id,
      name:req.cookies.name,
      teams:{
        heading:heading,
        project_detail:project_detail,
        total_members:teamMembers,
        project_type:projectType,
        contact_link:contactLink
      }
      
    });
    await newww.save(); 
   
}


//console.log(user);
res.redirect("/team");
    }catch(err){
        console.log(err);
        res.send("error")


    }
});



router.get("/team",(req,res)=>{
  console.log("req gone in othe.js")
    res.render("listing_team");
  })

  
  router.post("/showing-team", async (req, res) => {
    try {
      let total_challenges;
      // console.log("hey!");
      //to find all user expect and team is greater than 0
      const user = await team.find({

      });
      //console.log(user);
  
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  });
  








  router.get("/addHackathon",auth,(req,res)=>{
    res.render("add_hackathon");
});


router.post("/add_hackathon",async(req,res)=>{
  try{
      console.log(req.body);
const {name_hackathon,hackathon_detail,location,fees,ist_prize,second_prize,third_prize,
contact_link,hackathon_link
}=req.body;
const hackathon_data=await hackathon.findOne({user_id:req.cookies.user_id});
if(hackathon_data){

hackathon_data.hackathon_detail.push({
  hackathon_name:name_hackathon,
description:hackathon_detail,
location:location,
fees:fees,
contact_link:contact_link,
hackathon_link:hackathon_link,
prize:{
    ist:ist_prize,
    second:second_prize,
    third:third_prize
}





})
await hackathon_data.save(); 
res.redirect("/hackathon");



}else{

  const newww= await new hackathon({
      user_id:req.cookies.user_id,
      name:req.cookies.name,
      hackathon_detail:{
          hackathon_name:name_hackathon,
          description:hackathon_detail,
          location:location,
          fees:fees,
          prize:{
              ist:ist_prize,
              second:second_prize,
              third:third_prize
          },contact_link:contact_link,
          hackathon_link:hackathon_link,
      }
      
    });
    await newww.save(); 
res.redirect("/hackathon");
    //redirect page
  
}
}catch(err){
console.log(err);
  }
})

router.get("/hackathon",(req,res)=>{
  res.render("Listing_hackathon");
  })
router.post("/show_hackathon",async(req,res)=>{
  try{
const hackathons_details=await hackathon.find({});
console.log(hackathons_details);
res.send(hackathons_details);


  }catch(err){
    console.log(err);
    res.send(err);
  }
});







router.get("/addChallenges",(req,res)=>{
  res.render("add_challenges");
});


router.post("/add-challenges",async(req,res)=>{
  try{
     
const {name,detail,type,link}=req.body;
const challenges_details=await challenge_schema.findOne({user_id:req.cookies.user_id});
if(challenges_details){

  challenges_details.challenges_detail.push({
 challenge_name:name,
 description:detail,
 type:type,
 link:link

});
await challenges_details.save(); 
console.log(challenges_details);
res.redirect("/challenges");
}else{

  const newww= await new challenge_schema({
      user_id:req.cookies.user_id,
      name:req.cookies.name,
      challenges_detail:{
          challenge_name:name,
 description:detail,
 type:type,
 link:link
      }
      
    });
    await newww.save(); 
    res.redirect("/challenges");
console.log(newww);
    //redirect page
  
}






}catch(err){
console.log(err);
  }



})
  

    router.get("/challenges",(req,res)=>{
      res.render("listing_challenges");
    })

router.post("/show_challenges",async(req,res)=>{
  try{
    const challenges_details=await challenge_schema.find({});
    console.log(challenges_details);
    res.send(challenges_details);
  }
    catch(err){
console.log(err);
    }
  
})

module.exports=router;





