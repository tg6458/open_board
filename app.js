const express = require("express");
const socket = require("socket.io");
// var http = require('https');


const app = express(); //initilize the server
// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.render('index.html');
});

let port = process.env.PORT|| 5500;
let server = app.listen(port, () => {
  console.log("Listening port " + port);
});

// let io = socket(server, {
//   cors: {
//     origin: '*',
//   }
// });

var http = require('http');

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"]
  }
});

// server.listen(port);

io.on("connection", (socket) => {
  console.log("Made a connection");

  //transfer data to server to another
  socket.on("beginPath", (data) => {
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization');
