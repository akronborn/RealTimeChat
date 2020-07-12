const express = require('express')
const app =express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const port = process.env.PORT || 5000;

app.use(express.json());


// //Static File (Chat)
app.use(express.static('public'));

//Socket.io Chat
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

 

// Socket setup & pass server

io.on('connection', (socket) => {

    console.log('Connection Successful', socket.id);

    // Chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
server.listen(`${port}`, () => console.log(`Server is listening ${port}`));
