var express = require('express');
var router = express.Router();

const { verifySignUp } = require("@express/middlewares");
const { auth, products } = require("@controllers");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  auth.signup
);

router.post("/signin", auth.signin);

router.get('/roles', auth.roles);

module.exports = router;
