const express = require('express');
const cors = require('cors');
const {Server} = require('socket.io')
const http = require('http');

const app = express();

app.use(cors());

const server = http.createServer(app)


const io = new Server(server,{
    cors:{
        orgin:"http://localhost:3000",
        method:["GET","POST"],
    }
});



io.on('connection',(socket)=>{
    console.log(socket.id);

    socket.on("join_room",(data)=>{
        socket.join(data) ;
    });

    socket.on("send_message",(data)=>{
          socket.to(data.room).emit("receive_message",data);
    });




socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
});



});










server.listen(process.env.PORT||3001,()=>console.log("server started"))