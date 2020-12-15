const { User } = require("@models");
const ROLES = ["user", "admin", "moderator"];

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    email: req.fields.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.fields.roles) {
    for (let i = 0; i < req.fields.roles.length; i++) {
      if (!ROLES.includes(req.fields.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.fields.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};