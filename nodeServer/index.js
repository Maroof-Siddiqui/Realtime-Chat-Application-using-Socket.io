const http = require('http');
const server = http.createServer();

const io = require('socket.io')(server,{
    cors:{
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST'], // Set allowed HTTP methods
        allowedHeaders: ['my-custom-header'], // Set allowed headers
        credentials: true // Set to true if you want to allow sending cookies along with the requests
    }
});

server.listen(8000, () => {
    console.log('Server listening on port 8000');
  });

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log('inside io.on with ', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message:message, name: users[socket.id] })
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',{name : users[socket.id]});
        delete users[socket.id];
    });
})
