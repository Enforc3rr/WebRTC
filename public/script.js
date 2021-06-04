const socket = io("/");
//Getting reference of video-grid.
const videoGrid = document.getElementById("video-grid");
/*
first param = userID , which we are leaving upto server to decide.
In normal application It would be better to use userID instead.
*/
const peer = new Peer(undefined,{
    host : "/",
    port : 8001
});
//Getting Ref to our own video.
const myVideo = document.createElement("video");
myVideo.muted = true;//mute video for ourselves.

navigator.mediaDevices.getUserMedia({
    video : true ,
    audio : true
}).then(stream => {
    addVideoStream(myVideo,stream);
    peer.on("call",call=>{
        call.answer(stream);
        //creating our own video Element
        const video = document.createElement("video");
        call.on("stream",otherUserVideoStream =>{
            addVideoStream(video,otherUserVideoStream);
        });
    })
    socket.on('user-connected', userId => {
        // user is joining
        setTimeout(() => {
            // user joined
            connectToNewUser(userId, stream)
        }, 1000);
    });
});


//This basically means that as soon as we get open up our server and get UserID we want it to run
peer.on("open",userID =>{
    socket.emit("join-room", ROOM_ID , userID);
    socket.emit("user-connected",userID);
});
//function to tell our video Object to use the stream of video
const addVideoStream = (video , stream )=>{
    //to play our video as we are setting source of the video to our stream
    video.srcObject = stream;
    /*
    The loadedmetadata event occurs when metadata(Metadata is data that describes other data) for the specified audio/video has been loaded.
    Metadata for audio/video consists of: duration, dimensions (video only) and text tracks.
     */
    video.addEventListener("loadedmetadata", ()=>{
        //since we have already set the object of video , here we are just playing it
        video.play();
    });
    //we are appending the video to the grid so that we can see it on frontend
    videoGrid.append(video);
};
//Function to send our stream and userID to new User who connects to the room
const connectToNewUser = (userID,stream)=>{
    //To call the user to who we wanna give our stream
    const call = peer.call(userID,stream);
    //creating our own video Element
    const video = document.createElement("video");
    //receiving the videoStream of other user.
    call.on("stream",otherUserVideoStream=>{
        addVideoStream(video,otherUserVideoStream);
    });
    //If Other User disconnects
    call.on("close",()=>{
        video.remove();
    })
}