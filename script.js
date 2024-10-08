const ws = new WebSocket('ws://localhost:3000');
let msg=document.querySelector("message");
let Inputmsg=document.querySelector("input-msg");
let Sendbtn=document.querySelector("sendbtn");
ws.addEventListener("onmessage",()=>{
    let message=document.createElement('div');
    message.textContent=e.data;
    msg.appendChild("message");
    msg.scrollTop=msg.scrollHeight;// auto scroll top to bottom
})

Sendbtn.addEventListener("click",()=>{
   const usermsg=Inputmsg.value;
   ws.send(usermsg);
   Inputmsg.value="";
})
