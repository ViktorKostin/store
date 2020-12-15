const { auth } = require("@configs");
const { User, Role } = require("@models");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    email: req.fields.email,
    password: bcrypt.hashSync(req.fields.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.fields.roles) {
      Role.find(
        {
          name: { $in: req.fields.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.fields.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.fields.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, auth.secret, {
        expiresIn: 86400 // 24 hours
      });

      var roles = [];

      for (let i = 0; i < user.roles.length; i++) {
        roles.push(user.roles[i].name);
      }
      res.status(200).send({
        id: user._id,
        email: user.email,
        roles: roles,
        accessToken: token
      });
    });
};

exports.roles = (req, res) => {
  Role.find()
    .exec((err, roles) => {
      let rolesNames = []
      roles.forEach(role => rolesNames.push(role.name))
      res.json({
        roles: rolesNames
      })
    });
}