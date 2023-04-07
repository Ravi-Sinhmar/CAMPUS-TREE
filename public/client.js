
const socket = io()
let cookies_user_id;
let cookies_user_name;
const plus = document.getElementById("plus");
let isgroup=0;
let arr_chats=[];



const community = document.getElementById("community");
const search = document.getElementById("search");
const chat_section = document.getElementById("chat-section");
const textarea = document.getElementById("textarea");
const chats = document.getElementById("chat_text");
const commnunitychats = document.getElementById("community_text");
const chatcol = document.getElementById("column2");
const nav_tgl = document.getElementById("nav-toggle");
const three_dot = document.getElementById("three-dot");
const chat_group = document.getElementById("chat_group");
const main_row = document.getElementById("main-row");
const profile = document.getElementById("profile");
// const community_name = document.getElementById("community");
const create_community = document.getElementById("create-community");



const allchats = document.getElementById("all-chats");
const all_group_chats = document.getElementById("all-group-chats");
let messageArea = document.querySelector('.message__area')
let groupname=document.querySelector(".groupname")
let creategroup = document.querySelector('.creategroup')
let row = document.querySelector('.row')
let content = document.querySelector('.content')
let yourProfileName = document.querySelector('.your-profile-name')
let outerchat = document.querySelector('.outer-chat')
let overchatbtn = document.querySelector('.overchatbtn')

const fname = document.getElementById("fname");
const fcollege = document.getElementById("fcollege");
const field = document.getElementById("field");
const fscore = document.getElementById("score");
const container = document.getElementById("container");

let group_input_div=document.getElementById("group-input-div");



// const start_community = document.getElementById("start-community");








// Some Global Variablnnes

let username="";
let members=[];


//three dot click
 three_dot.addEventListener("click",function(){
    
    if(nav_tgl.style.display=="none"){
        nav_tgl.style.display="block"
        chat_group.style="margin-top:8.5rem"  
        
        
    }
    else if(nav_tgl.style.display=="block"){
        chat_group.style="margin-top:0rem"  
        nav_tgl.style.display="none"  
    }

 })


















// Community Section Starts

// community.addEventListener("click",async function(){
//  members.push(cookies_user_id) 
   
//     isgroup=1;
//     const request=await fetch("http://localhost:3000/startcommunity",{
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//        }).then((Response)=>{
//            return Response.json();
//        }).then((data)=>{

// console.log(data);
//         data.details.forEach((details)=>{
//  const pbox=document.createElement("div");
//  pbox.classList.add('pbox');
//  container.appendChild(pbox);


//  const pinnerbox=document.createElement("div");
//  pinnerbox.classList.add('text-center','card-box');
//  pbox.appendChild(pinnerbox);


//  const numbercard=document.createElement("div");
// numbercard.classList.add('number-card', 'pt-2','pb-2');
// pinnerbox.appendChild(numbercard);


// const pimgdiv=document.createElement("div");
// pimgdiv.classList.add("thumb-lg","number-thumb","mx-auto","pimgdiv");
// numbercard.appendChild(pimgdiv);


// const pimg=document.createElement("Img");
// pimg.classList.add("pimg");
// pimg.setAttribute("src","https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDUyNDk0fHxlbnwwfHx8fA%3D%3D&w=1000&q=80")
// pimgdiv.appendChild(pimg)


// const pinfodiv=document.createElement("div");
// numbercard.appendChild(pinfodiv);


// const pname=document.createElement("h4");
// pname.setAttribute("id","fname");
// pname.innerHTML=details.full_name;
// pinfodiv.appendChild(pname);


// const pcollege=document.createElement("h4");
// pcollege.setAttribute("id","fcollege");
// pcollege.innerHTML=details.college;
// pinfodiv.appendChild(pcollege);



// const pfield=document.createElement("p");
// pfield.setAttribute("id","field");
// pfield.innerHTML=details.user_id;
// pinfodiv.appendChild(pfield);

// const pbutton=document.createElement("button");
// pbutton.classList.add('btn',"btn-primary");
// pbutton.setAttribute("onclick", "hello2(value,name)");
// pbutton.setAttribute("name", details.full_name);
// pbutton.setAttribute("value", details.email);

// pbutton.innerHTML="add"
// numbercard.appendChild(pbutton)


// const scoreParg=document.createElement("p");
// numbercard.appendChild(scoreParg)
// const pscore=document.createElement("SPAN");
// scoreParg.appendChild(pscore);


// const spaninner=document.createElement("p");
// spaninner.innerHTML=`score:${"0"}`;
// pscore.appendChild(spaninner);
        
//         });


//        })
// }
// );

let chat_community_div=document.getElementById("chat-community-div")
let community_input=document.getElementById("community-name")

create_community.addEventListener("click", async function(){
    group_input_div.style.display="none"
chat_community_div.style.display="none"
main_row.style.display="block"
isgroup=1;
 let group_id = Date.now() + Math.random();
 group_id = group_id.toString().replace(".","_");
let group_name=community_input.value;
      
   
        const request=await fetch("http://localhost:3000/creategroup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({chat_id:group_id,members:members,admin_id:cookies_user_id,person1:group_name,person2:group_name,isgroup:true})

           }).then((Response)=>{
            return Response.json();
        }).then((data)=>{
            
        //  console.log(data.admin_docs[0].chatname)
            // alert(data.allchats.length);
for(let i=0;i<data.admin_docs.length;i++){
    const groupbutton=document.createElement("button");
    groupbutton.classList.add("button","overchatbtn");
    
    groupbutton.setAttribute("name", data.admin_docs[i].chatname);
    groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
    groupbutton.setAttribute("value", cookies_user_id);
    groupbutton.setAttribute("id",data.admin_docs[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
   
    all_group_chats.appendChild(groupbutton)

    const underbtn=document.createElement("div");
    underbtn.classList.add("under-btn")
    groupbutton.appendChild(underbtn)
    
    const outerchat=document.createElement("div");
    outerchat.classList.add("outer-chat")
    underbtn.appendChild(outerchat)
    
    
    const groupphoto=document.createElement("img");
    groupphoto.classList.add("profile-img")
    
    groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
    outerchat.appendChild(groupphoto);
    
    const grouph4=document.createElement("h4");
    grouph4.classList.add("profile-name")
    grouph4.innerHTML=data.admin_docs[i].chatname;
    outerchat.appendChild(grouph4);

    const groupicon=document.createElement("div");
    groupicon.classList.add("group-icon")
  
    const icon=document.createElement("i");
    icon.classList.add("fa","fa-users")
    icon.setAttribute("aria-hidden","true" );
    groupicon.appendChild(icon)
    underbtn.appendChild(groupicon)
    
}
    
})
location.reload();
})





const  hello2 =(async(v2,username)=>{

    if(isgroup==0){

if(arr_chats.length!=0){
    for(let i=0;i<arr_chats.all_chat.length;i++){
        if(arr_chats.all_chat[i].chatname==username){
            alert('already in chat');
            isgroup=2;
           break;
        
        }
    }

        
        allchats.style="display:flex;flex-direction:column"
        profile.style.display="none";
        
        main_row.style.display="block";
       
    
let new_element=document.createElement("div");

     
        let group_id = Date.now() + Math.random();
   group_id = group_id.toString().replace(".","_");
        // let check={
        //     Sentby:From,
        //     Recivedby:To
        // }
        members.push(v2);
        

       
        const request=await fetch("http://localhost:3000/creategroup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({chat_id:group_id,members:members,admin_id:cookies_user_id,person1:cookies_user_name,person2:username,isgroup:false})

           }).then((Response)=>{
            return Response.json();
        }).then((data)=>{
            
        //  console.log(data.admin_docs[0].chatname)
            // alert(data.allchats.length);
for(let i=0;i<data.admin_docs.length;i++){
    const groupbutton=document.createElement("button");
    groupbutton.classList.add("button","overchatbtn");
    groupbutton.setAttribute("name", data.admin_docs[i].chatname);
    groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
    groupbutton.setAttribute("value", cookies_user_id);
    groupbutton.setAttribute("id",data.admin_docs[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
  
    allchats.appendChild(groupbutton)
    
    const underbtn=document.createElement("div");
    underbtn.classList.add("under-btn")
    groupbutton.appendChild(underbtn)
    
    const outerchat=document.createElement("div");
    outerchat.classList.add("outer-chat")
    underbtn.appendChild(outerchat)
    
    
    const groupphoto=document.createElement("img");
    groupphoto.classList.add("profile-img")
    
    groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
    outerchat.appendChild(groupphoto);
    
    const grouph4=document.createElement("h4");
    grouph4.classList.add("profile-name")
    grouph4.innerHTML=data.admin_docs[i].chatname;
    outerchat.appendChild(grouph4);
}
location.reload();

}) }

else{
    allchats.style="display:flex;flex-direction:column"
    profile.style.display="none";
    main_row.style.display="block";
   

// let new_element=document.createElement("div");

   let person2=username;
    let group_id = Date.now() + Math.random();
group_id = group_id.toString().replace(".","_");
    // let check={
    //     Sentby:From,
    //     Recivedby:To
    // }
    members.push(v2);
    
   
    const request=await fetch("http://localhost:3000/creategroup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({chat_id:group_id,members:members,admin_id:cookies_user_id,person1:cookies_user_name,person2:person2,isgroup:false})

       }).then((Response)=>{
        return Response.json();
    }).then((data)=>{
        
    //  console.log(data.admin_docs[0].chatname)
        // alert(data.allchats.length);
for(let i=0;i<data.admin_docs.length;i++){
const groupbutton=document.createElement("button");
groupbutton.classList.add("button","overchatbtn");
groupbutton.setAttribute("name", data.admin_docs[i].chatname);
groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
groupbutton.setAttribute("value", cookies_user_id);
groupbutton.setAttribute("id",data.admin_docs[i].id );
groupbutton.setAttribute("onclick", "hello(value,name,id,title)");

allchats.appendChild(groupbutton)

const underbtn=document.createElement("div");
underbtn.classList.add("under-btn")
groupbutton.appendChild(underbtn)

const outerchat=document.createElement("div");
outerchat.classList.add("outer-chat")
underbtn.appendChild(outerchat)


const groupphoto=document.createElement("img");
groupphoto.classList.add("profile-img")

groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
outerchat.appendChild(groupphoto);

const grouph4=document.createElement("h4");
grouph4.classList.add("profile-name")
grouph4.innerHTML=data.admin_docs[i].chatname;
outerchat.appendChild(grouph4);
}
location.reload();

})



}
    }
   else if(isgroup==1){
    butto
members.push(v2)
if(members.length==1){
    group_input_div.style.display="flex";
}
// let data={"members":members,"chat_name":username};
// console.log(JSON.stringify(data))
        // Sending post request 
    }
    else if(isgroup==2){
   
 
        alert("Already in your Chat")
    }
});


// After Clicking Create Group Button

// creategroup.addEventListener("click",  async function(){
// isgroup=1;
//  let group_id = Date.now() + Math.random();
//  group_id = group_id.toString().replace(".","_");
// let group_name=groupname.value;
//         row.style="display:flex"
//         content.style="display:none"
//         creategroup.style.display="none"
//     groupname.style.display="none"
//         const request=await fetch("http://localhost:3000/creategroup",{
//             method:"POST",
//             headers:{
//               "Content-Type":"application/json",
//             },
//             body:JSON.stringify({chat_id:group_id,members:members,admin_id:cookies_user_id,person1:group_name,person2:group_name,isgroup:true})

//            }).then((Response)=>{
//             return Response.json();
//         }).then((data)=>{
            
//         //  console.log(data.admin_docs[0].chatname)
//             // alert(data.allchats.length);
// for(let i=0;i<data.admin_docs.length;i++){
//     const groupbutton=document.createElement("button");
//     groupbutton.classList.add("button","overchatbtn");
    
//     groupbutton.setAttribute("name", data.admin_docs[i].chatname);
//     groupbutton.setAttribute("title", data.admin_docs[i].isgroup);
//     groupbutton.setAttribute("value", cookies_user_id);
//     groupbutton.setAttribute("id",data.admin_docs[i].id );
//     groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
   


//     all_group_chats.appendChild(groupbutton)

//     const underbtn=document.createElement("div");
//     underbtn.classList.add("under-btn")
//     groupbutton.appendChild(underbtn)
    
//     const outerchat=document.createElement("div");
//     outerchat.classList.add("outer-chat")
//     underbtn.appendChild(outerchat)
    
    
//     const groupphoto=document.createElement("img");
//     groupphoto.classList.add("profile-img")
    
//     groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
//     outerchat.appendChild(groupphoto);
    
//     const grouph4=document.createElement("h4");
//     grouph4.classList.add("profile-name")
//     grouph4.innerHTML=data.admin_docs[i].chatname;
//     outerchat.appendChild(grouph4);

//     const groupicon=document.createElement("div");
//     groupicon.classList.add("group-icon")
  
//     const icon=document.createElement("i");
//     icon.classList.add("fa","fa-users")
//     icon.setAttribute("aria-hidden","true" );
//     groupicon.appendChild(icon)
//     underbtn.appendChild(groupicon)
    
// }
    
// })
// location.reload();
// })


// community section Ends



// Single chat section start

// plus.addEventListener("click",async function(){
//     isgroup=0;
//     members.push(cookies_user_id) 
      
//        const request=await fetch("http://localhost:3000/startcommunity",{
//            method:"POST",
//            headers:{
//              "Content-Type":"application/json",
//            },
//           }).then((Response)=>{
//               return Response.json();
//           }).then((data)=>{
   
//    console.log(data);
//            data.details.forEach((details)=>{
//     const pbox=document.createElement("div");
//     pbox.classList.add('pbox');
//     container.appendChild(pbox);
   
   
//     const pinnerbox=document.createElement("div");
//     pinnerbox.classList.add('text-center','card-box');
//     pbox.appendChild(pinnerbox);
   
   
//     const numbercard=document.createElement("div");
//    numbercard.classList.add('number-card', 'pt-2','pb-2');
//    pinnerbox.appendChild(numbercard);
   
   
//    const pimgdiv=document.createElement("div");
//    pimgdiv.classList.add("thumb-lg","number-thumb","mx-auto","pimgdiv");
//    numbercard.appendChild(pimgdiv);
   
   
//    const pimg=document.createElement("Img");
//    pimg.classList.add("pimg");
//    pimg.setAttribute("src","https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw5NDUyNDk0fHxlbnwwfHx8fA%3D%3D&w=1000&q=80")
//    pimgdiv.appendChild(pimg)
   
   
//    const pinfodiv=document.createElement("div");
//    numbercard.appendChild(pinfodiv);
   
   
//    const pname=document.createElement("h4");
//    pname.setAttribute("id","fname");
//    pname.innerHTML=details.full_name;
//    pinfodiv.appendChild(pname);
   
   
//    const pcollege=document.createElement("h4");
//    pcollege.setAttribute("id","fcollege");
//    pcollege.innerHTML=details.college;
//    pinfodiv.appendChild(pcollege);
   
   
   
//    const pfield=document.createElement("p");
//    pfield.setAttribute("id","field");
//    pfield.innerHTML=details.user_id;
//    pinfodiv.appendChild(pfield);
   
//    const pbutton=document.createElement("button");
//    pbutton.classList.add('btn',"btn-primary");
//    pbutton.setAttribute("onclick", "hello2(value,name)");
//    pbutton.setAttribute("name", details.full_name);
//    pbutton.setAttribute("value", details.email);
   
//    pbutton.innerHTML="add"
//    numbercard.appendChild(pbutton)
   
   
//    const scoreParg=document.createElement("p");
//    numbercard.appendChild(scoreParg)
//    const pscore=document.createElement("SPAN");
//    scoreParg.appendChild(pscore);
   
   
//    const spaninner=document.createElement("p");
//    spaninner.innerHTML=`score:${"0"}`;
//    pscore.appendChild(spaninner);
           
//            });
//           })
//    }
//    );
let gptype="";
let Specific_chat_id="";
let Specific_chat_name="";

let column2=document.getElementById("column2");



const hello = ( async (value,name,id,title) => {
    all_group_chats.style.display="none"
    allchats.style.display="none";
    yourProfileName.innerHTML=name;
column2.style="display:flex;flex-direction:column";
messageArea.innerHTML="";
    socket.emit("startchat",{value:value,name:name,id:id,title:title})
    
   gptype=title;
   Specific_chat_id=id;
Specific_chat_name=name;
   const request=await fetch("http://localhost:3000/printchats",{
           method:"POST",
           headers:{
             "Content-Type":"application/json",
           },
           body:JSON.stringify({Specific_chat_id:Specific_chat_id})
          }).then((Response)=>{
              return Response.json();
          }).then((data)=>{

            
for(let i=0; i<data.message.length;i++){
if(data.message[i].sentby==cookies_user_name){
    
    let msg={
        message:data.message[i].chat
    }
    appendMessage(msg, 'outgoing')
    scrollToBottom()
}
else {
    let msg={
        message:data.message[i].chat
    }
    appendMessage(msg, 'incoming')
    scrollToBottom()
}

}

          })

});

textarea.addEventListener("keyup" , (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value);
        
    }
});

function sendMessage(message) {
    if(gptype=="0"||gptype==false||gptype=="false"){
     
       
        let msg={
            Senderid:cookies_user_name,
           chat_id:Specific_chat_id,
           chat_name:"not a group chat",
            message:message.trim()
        }
         // Append 
     appendMessage(msg, 'outgoing')
     textarea.value = ''
     scrollToBottom()
     // Send to server 
     socket.emit('message', msg)
       
    }
    else if(gptype=="1"||gptype==true||gptype=="true"){
        
        let msg={
            Senderid:cookies_user_name,
           chat_id:Specific_chat_id,
           chat_name:Specific_chat_name,
            message:message.trim()
        }
        
 // Append 
 appendMessage(msg, 'outgoing')
 textarea.value = ''
 scrollToBottom()
 // Send to server 
 socket.emit('message', msg)
    }
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('testm', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
socket.on("sendmessage",function(msg){
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
socket.on("Senderside",function(chat){
    let msg={
        message:chat
    }
    appendMessage(msg, 'outgoing')
    scrollToBottom()
})
socket.on("Reciverside",function(chat2){
    let msg={
        message:chat2
    }
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}




















//my code
window.onload=(async()=>{
    cookiearray = document.cookie.split(';');
    cookies_user_id = cookiearray[1].split('=')[1];
  let  cookies_user_name_noneformate=cookiearray[2].split('=')[1];
    cookies_user_name=decodeURIComponent(cookies_user_name_noneformate)
    //access cookies of user
//fetch'
let x=" ";

const request= await
fetch("http://localhost:3000/all_chats_details",{
    method:"POST",
     headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({cookies_user_id:cookies_user_id,cookies_user_name:cookies_user_name})

}).then((Response)=>{
    return Response.json();
}).then((data)=>{

    arr_chats=data;
    for(let i=0;i<data.all_chat.length;i++){
        const groupbutton=document.createElement("button");
        groupbutton.classList.add("button","overchatbtn");
   
        groupbutton.setAttribute("name", data.all_chat[i].chatname);
    groupbutton.setAttribute("title", data.all_chat[i].isgroup);
    groupbutton.setAttribute("value", cookies_user_id);
    groupbutton.setAttribute("id",data.all_chat[i].id );
    groupbutton.setAttribute("onclick", "hello(value,name,id,title)");
      
    const underbtn=document.createElement("div");
    underbtn.classList.add("under-btn")
    groupbutton.appendChild(underbtn)
    
    const outerchat=document.createElement("div");
    outerchat.classList.add("outer-chat")
    underbtn.appendChild(outerchat)
    
    
    const groupphoto=document.createElement("img");
    groupphoto.classList.add("profile-img")
    
    groupphoto.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU");
    outerchat.appendChild(groupphoto);
    
    const grouph4=document.createElement("h4");
    grouph4.classList.add("profile-name")
    grouph4.innerHTML=data.all_chat[i].chatname;
    outerchat.appendChild(grouph4);

   

if(groupbutton.title==true||groupbutton.title=="true"||groupbutton.title==1||groupbutton.title=="1"){
    const groupicon=document.createElement("div");
    groupicon.classList.add("group-icon")
  
    const icon=document.createElement("i");
    icon.classList.add("fa","fa-users")
    icon.setAttribute("aria-hidden","true" );
    groupicon.appendChild(icon)
    underbtn.appendChild(groupicon)
    all_group_chats.appendChild(groupbutton)
}
else if(groupbutton.title==false||groupbutton.title=="false"||groupbutton.title==0||groupbutton.title=="0"){
    allchats.appendChild(groupbutton)
}
    }
        
    })

})

















































//media query

function myFunction(x) {
    if (x.matches) { // If media query matches



        chatcol.style.display="none"
        if(allchats.style.display=="flex"){
            all_group_chats.style.display="none"
            allchats.style.display="flex"
        }
        else if( all_group_chats.style.display=="flex"){
            allchats.style.display="none"
            all_group_chats.style.display="flex"
        }
        
        chats.addEventListener("click",function(){
            chatcol.style.display="none"
            all_group_chats.style.display="none"
        allchats.style="display:flex;flex-direction:column"
        
        })
        commnunitychats.addEventListener("click",function(){
      
            chatcol.style.display="none"
            allchats.style.display="none"
            all_group_chats.style.display="flex"
        }
        )
        
    } else { 

         chatcol.style.display="flex"
         if(allchats.style.display=="flex"){
            all_group_chats.style.display="none"
            allchats.style.display="flex"
        }
        else if( all_group_chats.style.display=="flex"){
            allchats.style.display="none"
            all_group_chats.style.display="flex"
        }
         
        chats.addEventListener("click",function(){
            chatcol.style.display="flex"
            all_group_chats.style.display="none"
        allchats.style.display="flex"
        
        })
        commnunitychats.addEventListener("click",function(){
            chatcol.style.display="flex"
            allchats.style.display="none"
            all_group_chats.style.display="flex"
        }
        )
     
        
    }
  }
  
  var x = window.matchMedia("(max-width: 750px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes









  //start chat with someone fetch
  plus.addEventListener("click", async function(){
    isgroup=0;
    group_input_div.style.display="none";
    main_row.style.display="none";
    const response = await fetch("http://localhost:3000/other_profile", {      //localhost:3000
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
       headers: {
        'Content-Type': 'application/json'

       },
      
   


        // body data type must match "Content-Type" header
    }).then((Response)=>{
       
      return Response.json();
    }).then((data)=>{
        
      //console.log(data);
//allData=data;
//console.log(allData);
  

let profile=document.getElementById("profile");+


data.forEach((data,n)=>{


  // let pbox=document.createElement("div");
  // pbox.setAttribute("class","pbox");
  // profiless.appendChild(pbox);
   user_id=data.user_id.toString();

  
 
//console.log(data.user_id.toString());


profile.innerHTML+=`
   
<div id="profiless">
<div id="image-div" class="">
  <img  src=${data.profile_image}></div>

      <div id="main_content" class="">
        <div id="details-div">
            <h4 id="fname"> ${data.fullname}</h4>
            <h4 id="fcollege">@${data.user_id}</h4>
            </div>
           <p><span></span></p>
            <p>score:0</p><p></p></div>
<div id="button-div">
<button name="${data.fullname}" value="${data.user_id}"   class="btn btn-primary" onclick="hello2(value,name)" >Message</button>
</div>
            
</div>

     `;
              
              can_search=true;
            });
    

    }).catch((e)=>{
        
    });
  })


  community.addEventListener("click", async function(){
    isgroup=1;
    
    main_row.style.display="none"
    const request = await fetch("http://localhost:3000/other_profile", {      //localhost:3000
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
       headers: {
        'Content-Type': 'application/json'

       },

        // body data type must match "Content-Type" header
    }).then((Response)=>{
      return Response.json();
    }).then((data)=>{
      //console.log(data);
//allData=data;
//console.log(allData);
  

let profile=document.getElementById("profile");+
data.forEach((data,n)=>{


  // let pbox=document.createElement("div");
  // pbox.setAttribute("class","pbox");
  // profiless.appendChild(pbox);
   user_id=data.user_id.toString();

  
 
//console.log(data.user_id.toString());


profile.innerHTML+=`
   
<div id="profiless">
<div id="image-div" class="">
  <img  src=${data.profile_image}></div>

      <div id="main_content" class="">
        <div id="details-div">
            <h4 id="fname">${data.fullname}</h4>
            <h4 id="fcollege">@${data.user_id}</h4>
            </div>
           <p><span></span></p>
            <p>score:0</p><p></p></div>
<div id="button-div">
<button name="${data.fullname}" value="${data.user_id}"   class="btn btn-primary" onclick="hello2(value,name)" >ADD</button>
</div>
            
</div>





     `;
              
              can_search=true;
            });
    
          


    }).catch((e)=>{
        
    });
  })
