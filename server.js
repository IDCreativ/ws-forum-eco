var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
app.use(cors());
var io = require('socket.io')(http, {
    cors:{
        origins: ["https://localhost:8000/*"],

        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "https://localhost:8000/*",
                "-Control-Allow-Methods": "GET, POST",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": true
            });
            res.end();
        }
    }
});
app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    console.log('a user is connected');
    socket.on('disconnect', function (){
        console.log('a user is disconnected');
    })
    socket.on('questionSent', function (obj){
        console.log("questionSent", obj);
        io.emit('questionSent', obj);
    })
    socket.on('questionStatus', function (obj){
        console.log("questionStatus", obj);
        io.emit('questionStatus', obj);
    })
    socket.on('questionDelete', function (obj){
        console.log(obj);
        io.emit('questionDelete', obj);
    })
    socket.on('moduleStatus', function (obj){
        console.log(obj);
        io.emit('moduleStatus', obj);
    })
    socket.on('eventStatus', function (obj){
        console.log(obj);
        io.emit('eventStatus', obj);
    })
    socket.on('videoStatus', function (obj){
        console.log(obj);
        io.emit('videoStatus', obj);
    })
    socket.on('pollStatus', function (obj){
        console.log(obj);
        io.emit('pollStatus', obj);
    })
    socket.on('pollVisibility', function (obj){
        console.log(obj);
        io.emit('pollVisibility', obj);
    })
    socket.on('pollSent', function (obj){
        console.log(obj);
        io.emit('pollSent', obj);
    })
    socket.on('pollResults', function (obj){
        console.log(obj);
        io.emit('pollResults', obj);
    })
})

http.listen(4000, function(){
    console.log("Server running on 4000")
})