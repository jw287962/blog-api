const genPassword = require("../passport").genPassword;
const validPassword = require("../passport").validPassword;
const jwt = require("jsonwebtoken");

const User = require("../models/user");
exports.login = async function (req, res, next) {
  const { userID, userPW } = req.params;
  const user = await User.findOne({ username: userID }, { username, blogger });
  try {
    if (!user) {
      res.status(401).json({
        message: "USER NOT FOUND",
      });
    } else {
      const isValid = validPassword(userPW, user.password, user.salt);
      if (isValid) {
        jwt.sign({ userID }, "secretkey", { expiresIn: "1d" }, (err, token) => {
          if (err) {
            res.json("jwt sign in error");
          }
          res.json({ token, user });
        });
      } else {
        res.status(401).json({
          message: "INCORRECT PASSWORD",
        });
      }
    }
  } catch (e) {
    console.error("ERROR:", e);
    res.json({ message: "Login Error..." });
  }
};

exports.register = async function (req, res, next) {
  // hash password and salt
  // the front end will be where i will need to escape and stuff i guess? before sending it here.
  const { userID, userPW } = req.params;
  const isBlogger = req.query;
  const hashSalt = genPassword(userPW);
  // prob need to search db and see if there is a user already in
  const result = await User.find({ username: userID }).exec();
  console.log(result.length);

  if (result.length != 0) {
    res.json({ message: "user EXISTS" });
  } else {
    try {
      const user = new User({
        username: userID,
        password: hashSalt.hash, //hashed
        salt: hashSalt.salt,
        blogger: Boolean(isBlogger),
      });
      const createUser = await User.create(user);
      console.log(createUser);
      res.json({
        user: userID,
        isBlogger,
        hashSalt: "hashed n salt",
        register: "registering user",
      });
    } catch (e) {
      console.error("ERROR:", e);
      res.json({ message: "Can't Create User" });
    }
  }
};
