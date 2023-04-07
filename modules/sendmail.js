const nodemailer=require("nodemailer");
require("dotenv").config();
module.exports =sendmail=async(otp,email)=>{
    try{
      const admin_email=process.env.email;
      const password=process.env.password;
   // console.log(email,otp)
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user: admin_email, 
              pass: password, //Temp password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: admin_email, // sender address
            to: `${email}`, // list of receivers
            subject: "Your one time password", // Subject line
            html: `Your one time password is ${otp} :)`
          });   

          console.log("Email sent");

          return true;
    }

    catch(err){

        console.log(err);

return false;
    }
}
//npnzpasafgxhocez