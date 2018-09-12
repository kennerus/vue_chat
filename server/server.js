const app = require('express')();
const server = app.listen(3000, () => {
  console.log('server is running on port 3000')
});
const io = require('socket.io')(server);

let users = [];

function getUser(id) {
  return users.find(user => user.id === id);
}

io.on('connection', function (socket) {

  socket.on('CONNECT', (data) => {
    const user = {
      name: data.user,
      id: socket.id
    };
    users.push(user);
    socket.emit('CONNECT', user);
    io.emit('NEW_CONNECT', {
      message: `${data.user} присоединился к чату!`,
      users
    });
  });


  socket.on('TYPING', function (isUserTyping) {
    const user = getUser(socket.id);
    if (user) {
      if (isUserTyping) {
        socket.broadcast.emit('TYPING', {message: `${user.name} печатает...`});
      } else {
        socket.broadcast.emit('TYPING', {message: ''});
      }
    }
  });

  socket.on('SEND_MESSAGE', function (data) {
    console.log(`Message from ${getUser(socket.id).name}: `, data);
    io.emit('MESSAGE', data);
  });

  socket.on('disconnect', function () {
    users = users.filter((user) => {
      console.log('user disconnected: ', user.id === socket.id ? user.name : socket.id);
      return user.id !== socket.id
    });
  });

});