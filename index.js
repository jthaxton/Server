var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + 'index.html');
});

io.on('connection', function(socket){
  console.log('A user has connected!');
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });

});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
//edited this from 3000
  console.log("Started listening on %s", app.url);

http.listen(3000, function(){
  console.log('listening on *:');
});

io.emit('some event', {for: 'everyone'});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
