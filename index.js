const express = require("express");
const app = express();
/*
Here as argument of createServer we're passing in a requestListener.
 Specifies a function to be executed every time the server gets a request. This function is called a requestListener,
 and handles request from the user, as well as response back to the user.
*/
const http = require('http').createServer(app);
//The require('socket.io')(http) creates a new socket.io instance attached to the http server.
const io = require("socket.io")(http);
const {v4} = require("uuid");

app.set('view engine', 'ejs');
//It is used to serve static files
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.redirect(`/${v4()}`);
});

app.get('/:room', (req, res) => {
    //basically we are passing in roomId to our front-end code.
    res.render('room', { roomId: req.params.room });
});
//"connection is called when we load in the page , "connection" is basically emitted and this function gets called.
io.on("connection", socket =>{
    console.log("user connected");
    socket.on("join-room",(roomId,userId)=>{
        // join is basically just a function associated with that roomID OR call join to subscribe the socket to a given channel
        socket.join(roomId);
        /*
        Broadcast basically means that we are sending message to many connected clients.
        Here , it will simply send message to every user in same room that user has connected expect the one who is joining
        */
        socket.to(roomId).broadcast.emit("user-connected",userId);
    });
});



const PORT = process.env.PORT || 8000;
http.listen( PORT);
console.log(`Server started at ${PORT}`)