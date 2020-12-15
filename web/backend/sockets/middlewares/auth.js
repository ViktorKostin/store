const jwt = require('socketio-jwt-auth');
const { auth } = require('@configs');
const { User, Role } = require("@models");

const verifyToken = jwt.authenticate({
  secret: auth.secret,
  succeedWithoutToken: true,
}, (payload, done) => {
  if (payload && payload.id) {
    User.findById(payload.id, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, 'user does not exist');
      }
      return done(null, user);
    });
  } else {
    return done()
  }
})

const isAdmin = (socket, next) => {
  const userId = socket.request.user._id;
  socket.request.isAdmin = false;
  socket.request.isLogged = false;

  if(userId) {
    socket.request.isLogged = true;
    User.findById(userId).exec((err, user) => {
      if (err) {
        return next(err);
      }

      Role.find(
        {
          _id: { $in: user.roles }
        }).distinct('name').exec(
        (err, roles) => {
          if (err) {
            return next(err);
          }

          if(roles.includes('admin')) {
            socket.request.isAdmin = true;
          }
          socket.request.roles = roles;

          return next()
        }
      );
    });
  } else {
    return next()
  }
};

module.exports = {
  verifyToken,
  isAdmin,
}
