//importing all local files and modules
const express=require("express");
const app=express();
// const express = require('express')
// const app = express()
const http = require('http').createServer(app)
// const ejs = require("ejs");
const connection = require("./connection/db");
const aChatSchema = require("./models/convo");    
const OnlySchema = require("./models/allchatid");
const user=require("./routers/user");
const other=require("./routers/other");

// const http = require('http').createServer(app);
const register=require("./models/registers");
const profile=require("./routers/profile");


const story=require("./routers/stories");
const ejs=require("ejs");
const cookieParser = require('cookie-parser')
const bp = require('body-parser');
const registers = require("./models/registers");
require("./connection/db");
// Socket 
const io = require('socket.io')(http)
//const registerSchema = require("./models/register");

// Middlewares 

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true ,limit:'500mb'}));

//middlewares
app.use(express.static(__dirname + './public'));
app.use(express.static("./public"));

app.use(bp.json({limit:'500mb'}));
app.use(bp.urlencoded({ extended: true ,limit:'500mb'}))
//   Ejs Template Added
app.set('view engine', 'ejs');

// Port Listening
const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});






// Routers start 
  app.get('/hack', function(req, res) {
    res.sendFile(__dirname+"/public/hack.html");
  });
// router 1
app.get('/chats',(req, res) => {
    res.render("chat")

});


// router 2
app.post("/startcommunity", async (req, res) => {
    const details = await registerSchema.find({});
    res.send({ details });

});




// router 3
app.post("/creategroup", async (req, res) => {
    OnlySchema.updateOne({ user_id: req.body.admin_id}, {
        $push: {
            allchats: { isgroup: req.body.isgroup, id: req.body.chat_id, chatname: req.body.person2 }
        }
    }).then(async function (result) {
        if (result.modifiedCount != 0) {
            console.log(result);
        }
        else {

            
            const admindocs = new OnlySchema({
                user_id: req.body.admin_id,
                allchats: [{
                    isgroup:req.body.isgroup ,
                    id: req.body.chat_id,
                    chatname: req.body.person2
                }]

            })
            await admindocs.save();
            console.log("data saved in mongodb in onlyshema");
            // OnlySchema.find({user_id: req.body.admin_id})

        }


        OnlySchema.findOne({ user_id: req.body.admin_id }).then(async function (result) {
            console.log("tttt"+result);
            admin_docs = result.allchats
            
            res.send( {admin_docs} );
            console.log(req.body.members[0]);
            console.log(req.body.members[1]);

        }).catch((error) => {
            //When there are errors We handle them here
            console.log("there is a error in only chatschema" + error);
        })




    }).catch((error) => {
        console.log(error)
    })

    for (let i = 0; i < req.body.members.length; i++) {
    
        console.log("above th3e loop"+ req.body.members.length)
        OnlySchema.updateOne({user_id: req.body.members[i] }, {
            $push: {
                allchats: { isgroup: req.body.isgroup, id: req.body.chat_id, chatname:req.body.person1 }
            }
        }).then(async function (result) {
            if (result.modifiedCount != 0) {
                console.log(result);
            }
            else {
                const admindocs = new OnlySchema({
                    user_id: req.body.members[i],
                    allchats: [{
                        isgroup: req.body.isgroup,
                        id: req.body.chat_id,
                        chatname: req.body.person1
                    }]

                })
                await admindocs.save();
                console.log("data saved in mongodb in onlyshema");
                // OnlySchema.find({user_id: req.body.admin_id})

            }


        }).catch((error) => {
            console.log(error)
        })

    }

});


let server_cookies_user_name;
let server_cookies_user_id;

app.post("/all_chats_details",async function(req,res){
try{
    server_cookies_user_id=req.body.cookies_user_id;
    server_cookies_user_name=req.body.cookies_user_name;
    OnlySchema.findOne({ user_id: server_cookies_user_id }).then(async function (result) {
        all_chat = result.allchats
        res.send({ all_chat  });


    }).catch((error) => {
        //When there are errors We handle them here
        console.log("there is a error in only chatschema" + error);
    })

}catch(err){
console.log(err);
}
})


app.post("/printchats", async function(req,res){
    try {

        console.log("this is req.body"+ req.body.Specific_chat_id);
        aChatSchema.findOne({chat_id:req.body.Specific_chat_id}).then(function(result){
            console.log("this is result.message"+ result.message);
            res.send(result)
        }).catch((err)=>{
   console.log("it comes here");
            console.log(err);

        })
    } catch (error) {
        console.log(error);
    }
})


































var test = 0;
// socket start 
let ChatId = "";
let Recivers = [];
let testid = "";
let ConnectedUsers = [];


io.on('connection', (socket) => {

socket.on("startchat",function(data){
    socket.join(data.id);
})


socket.on('message',  (msg) => {
    console.log(msg);
    aChatSchema.updateOne({ chat_id:msg.chat_id }, { $push: { message: { sentby: msg.Senderid, chat: msg.message,chat_name:msg.chat_name } }
      }).then(async function (result) {
        
          if (result.modifiedCount != 0) {
            
              console.log(result);
          }
          else {
         
             const tostore=aChatSchema({
              chat_id:msg.chat_id,
              message:[
                  {
                    chat_name:msg.chat_name,
                      sentby:msg.Senderid,
                      chat:msg.message,

                  }
              ]
             })
            
             await tostore.save();
             console.log("data save in in Database");

          }
      
      // socket.broadcast.emit('message', msg)
  }).catch((error) => {
    //When there are errors We handle them here
    console.log("there is a error" + error);

})
socket.broadcast.to(msg.chat_id).emit("sendmessage", msg);

});

});

app.post("/my_details",async()=>{
try{
console.log(req.cookies.id);
const user=await registers.findOne({_id:req.cookies.id});
console.log(user);
res.send({name:user.name});

}catch(err){

}

})














        
// const PORT = process.env.PORT || 3000
// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// });
// const io = require('socket.io')(http);
// app.use(io());



// Socket 


//port
// const port=process.env.PORT||3000;


/*app.use(express.json());
app.use(express.urlencoded({extended:false})); //for parsing for body parser 
*/
app.use(cookieParser());
//app.use(require('connect').bodyParser());
app.use(user);


app.use(profile);
app.use(story);
app.use(other);
//demo page 




// app.listen(port,()=>{
//     console.log("App is listenning on port no "+`${port}`);
// });




