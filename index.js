const express = require("express");
const app = express();
/*
The require('socket.io')(http) creates a new socket.io instance attached to the http server.
this syntax basically means that socket.io needs a http object as an argument
It looks something like this
module.exports = function (http) {
  // . . .
  return socket;
};
*/
const io = require("socket.io")(3000);
const {v4} = require("uuid");

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect(`/${v4()}`);
});

app.get('/:room', (req, res) => {
    //basically we are passing in roomId to our front-end code.
    res.render('room', { roomId: req.params.room });
});
//"connection is called when we load in the page , "connection" is basically emitted and this function gets called.
io.on("connection", socket =>{
    console.log("connected");
    socket.on("join-room",(roomId,userId)=>{
        console.log(userId,roomId);
    });
});



const PORT = process.env.PORT || 8000;
app.listen( PORT , ()=> console.log(`Server started at ${PORT}`));