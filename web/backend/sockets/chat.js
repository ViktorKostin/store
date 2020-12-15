const store = require('./stores/chat')
const { Chat, ChatUser, Message, User } = require("@models");


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


const chat = (socket, io) => {
  const { user, isAdmin, isLogged, roles } = socket.request;
  const fingerPrint = socket.handshake.query.finger_print;

  socket.on('join', () => {
    if(isLogged) {
      store.addUser(String(user._id), roles, socket.id);
      socket.join(String(user._id));
      if(!isAdmin)
        store.getAdmins().forEach(admin => {
          socket.broadcast.to(admin).emit('user connected', { user: {name: user.email, uid: user._id} })
        })
    } else {
      store.addUser(fingerPrint, ['guest'], socket.id);
      socket.join(fingerPrint);
      store.getAdmins().forEach(admin => {
        socket.broadcast.to(admin).emit('user connected', { user: fingerPrint })
      })
    }
  });

  socket.on('getMessages', ({ reciever }) => {
    store.getMessages(reciever, io, reciever);
  })

  socket.on('sendMessage', ({ message, reciever }) => {
    socket.broadcast.in(reciever).emit('message', { message, reciever });
    if(isAdmin) {
      store.saveMessage(user._id, message, reciever)
    } else {
      if(isLogged) {
        store.saveMessage(user._id, message, String(user._id))
        store.getAdmins().forEach(admin => {
          socket.broadcast.to(admin).emit('message notification', { user: user._id })
        })
      } else {
        store.saveMessage(fingerPrint, message, fingerPrint)
        store.getAdmins().forEach(admin => {
          socket.broadcast.to(admin).emit('message notification', { user: fingerPrint })
        })
      } 
    }
  });

  socket.on('join to reciever', ({ reciever }) => {
    socket.join(reciever)
  })

  socket.on('disconnect', () => {
    if(isLogged) {
      store.removeUser(user._id, socket.id, socket)
      store.getAdmins().forEach(admin => {
        socket.broadcast.to(admin).emit('user disconnected', { user: user._id })
      })
    } else {
      store.removeUser(fingerPrint, socket.id, socket)
      store.getAdmins().forEach(admin => {
        socket.broadcast.to(admin).emit('user disconnected', { user: fingerPrint })
      })
    }
  })
}

module.exports = chat;