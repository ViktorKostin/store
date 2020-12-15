const { Chat, ChatUser, Message } = require("@models");
const chat = {
  users: {},
  messages: {},
};

const addUser = (user, roles, socketId) => {
  if(!chat.users[user])
    chat.users[user] = {roles, sockets: [socketId]}
  else
    chat.users[user].sockets.push(socketId)
}

const addMessage = (user, role, message) => {
  if(!chat.messages[user])
    chat.messages[user] = [{ role, message }]
  else
    chat.messages[user].push({ role, message })
}

const getMessages = (user, io, destination) => {
  Chat.findOne({ user }).populate({path: 'messages', select: ['user', 'message']})
    .exec((err, chat) => {
      try {
        io.sockets.in(destination).emit('savedMessages', { messages: chat.messages })
      } catch {}
    })
}

const saveMessage = (user, message, reciever) => {
  var messageObj = new Message({
    user: String(user),
    message,
  })
  messageObj.save((err, msg) => {
    Chat.findOne({user: reciever})
      .exec((err, result) => {
        if(!result) {
          if(reciever)
            user = reciever
          var chatObj = new Chat({
            user: String(user),
            messages: [msg._id]
          })
          chatObj.save()
        }
        if(result) {
          Chat.update(
            {user: String(reciever)},
            {$push:
              {
                messages: [msg._id]
              }
            }, (e, r) => {})
        }
      })
  })
}

const removeUser = (user, socketId, socket) => {
  user = String(user)
  socketId = String(socketId)
  if(chat.users[user] && chat.users[user].sockets.length > 1) {
    const index = chat.users[user].sockets.findIndex((sId) => sId === socketId);
    if(index !== -1) return chat.users[user].sockets.splice(index, 1)[0];
  } else {
    delete chat.users[user]
    getAdmins().forEach(admin => {
      socket.broadcast.to(admin).emit('user disconnected', { user: user })
    })
  }
}

const getAdmins = () => {
  let admins = []
  for(let user in chat.users) {
    if(chat.users[user].roles.includes('admin')) {
      admins.push(user)
    }
  }

  return admins;
}

const getUser = (id) => chat.users[id];

const getUsers = () => {
  let users = []
  for(let user in chat.users) {
    if(!chat.users[user].roles.includes('admin')) {
      users.push(user)
    }
  }

  return users;
}

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getAdmins,
  saveMessage,
  addMessage,
  getMessages,
};