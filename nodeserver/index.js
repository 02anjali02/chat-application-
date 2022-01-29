const cors = require('cors')
const io = require("socket.io")(8000, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
})
const users = {};
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log("new user ", name);
    })
    socket.on('send', message => {
        socket.broadcast.emit('resieve', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave',users[socket.id] );
        delete users[socket.id];
    });
})