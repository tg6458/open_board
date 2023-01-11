const express = require("express");
const socket = require("socket.io");

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

let io = socket(server, {
  cors: {
    origin: '*',
  }
});

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
