const router=require("express").Router();
const cookieParser=require("cookie-parser");
const register=require("../models/registers");
const sendmail=require("../modules/sendmail");
const bcrypt=require("bcrypt");
//demo page 

/*router.get("/",(req,res)=>{
    res.render("main");
});*/


router.get("/register",(req,res)=>{
    //question if someone is at signup is we want to check the token 
    try{
        res.cookie("id",'');
        res.cookie("user_id","");
        res.cookie("name","");
        res.render("register",{status:"true"});
    }catch(err){
        res.send({status:false,message:"Something went wrong ",title:"wrong"});
    }
   
});



router.post("/register",async(req,res)=>{
    try{
     // empty cookies
      
        //object destructring
        const {full_name,user_id,city,college,email,password,confirm_password}=req.body;
        //object 
        const user={
                   full_name:full_name,
                   user_id:user_id,
                   password:password,
                   email:email,
                   college:college,
                   city:city
                   
               };
             const find_user=await register.findOne({email});
        if(find_user){
            res.render("register",{status:"false",message:"Email Exist",title:"Email",user:user});
            
           console.log(find_user);
        }
       
    else{

        if(confirm_password==password){   //password match with confirm 
        
           const otp=Math.floor(Math.random()*(9999-1000)+1000);  //Generate four digit otp 
           if(otp){
            console.log(otp,email);
           if(await sendmail(otp,email)==true){
            res.app.set("otp",otp);
               res.app.set("user",user);
               //res.send("Okay");
            res.redirect("/otp");
        }
           else{
            //error page   
            res.render("register",{status:"false",message:"Something went wrong",title:"Internal"})
           }}else{
               //error page
               res.render("register",{status:"false",message:"Something went wrong",title:"Internal"})
             
           } 
        
        }}
}    catch(err){
    console.log(err);
    res.send("register",{status:"false",message:"Something went wrong try later :(",title:"Internal"});

    }
});


router.get("/login",(req,res)=>{
    res.cookie("id","");
    res.cookie("user_id","");
    res.cookie("name","");
res.render("login");
});


router.post("/login",async(req,res)=>{
    try{
    const {email,password}=req.body;
    console.log(email,password);
    const user=await register.findOne({email:email});
     console.log(user);
    const input_user={email:email,
    password:password};
    if(await !user){
        console.log("not found");
        res.render("login",{status:"false",message:"No user found" ,title:"Not_found",user:input_user});
    }else{
        //match password
        const matched=await bcrypt.compare(password,user.password);
        console.log(matched);
        if(matched){
            res.cookie("id",user._id);
            res.cookie("id",user.user_id);
            res.cookie("name",user.full_name);
            res.redirect("/");
            
        }else{
            //error page
            res.render("login",{status:"false",message:"Check your password",title:"password",user:input_user});
        }
    }
    
    }catch(err){
        res.render("login",{status:"false",message:"Try again later",title:"internal"});
    }
    });

router.get("/otp",(req,res)=>{
//console.log(res.app.get("otp"));
if(res.app.get("user")){
    const user=res.app.get("user");
    res.render("otp",{user});
}
else{
    res.redirect({success:false},"/register");
}
});
router.post("/otp",async(req,res)=>{
    try{
        const {full_name,user_id,city,college,email,password}=res.app.get("user");
        // console.log(res.app.get("user"));
       const otp=res.app.get("otp");
     
     if(req.body.otp==otp){
             
         let data =await new register({    //create db 
             
            full_name:full_name,
            user_id:user_id,
             password:password,
             email:email,
             city:city,
             college:college,
              
     });
     
    data=await data.save();
     console.log("thsi data saved" +data);
    // res.cookie("Token_id",data._id);
    if(data){
        console.log(req.cookies.id); 
        res.cookie("id",data._id);
        res.cookie("user_id",data.user_id);
        res.cookie("name",data.full_name);
        res.redirect("/myprofile");

        //write fronetne for that

    }else{
        res.render("otp",{success:false,message:"Something went wrong",title:"Internal"});
    }
          
             
     }else{
         res.render("otp",{success:false,message:"Wrong otp",title:"Otp"});
         console.log("error");
     }
         }catch(err){
            console.log(err);  
            res.render("otp",{success:false,message:"Something went wrong",title:"Internal"});
              
         }
})





// router.get("/signup2",(req,res)=>{
//     res.render("signup2");
// })

module.exports=router;




//bcrypt == wala 
//json web tken== add(story wala kaam )
//page
//footer
//