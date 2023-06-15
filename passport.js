const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var crypto = require("crypto");

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },

//     function (email, password, cb) {
//       console.log(email);

//       // hash function

//       //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

//       return UserModel.findOne({ email, password })
//         .then((user) => {
//           if (!user) {
//             return cb(null, false, { message: "Incorrect email or password." });
//           }
//           const isValid = validPassword(password, user.hash, user.salt);
//           if (isValid) {
//             return cb(null, user, { message: "Logged In Successfully" });
//           } else {
//             return cb(null, false, { message: "pw incorrect" });
//             // password wrong
//           }
//         })
//         .catch((err) => cb(err));
//     }
//   )
// );

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(async function(id, done) {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch(err) {
//     done(err);
//   };
// });

// checking
module.exports.validPassword = validPassword = (password, hash, salt) => {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

// regsitering

module.exports.genPassword = function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

// module.exports.verifyToken = function verifyToken(req, res, next) {
//   const token = req.headers["token"];
//   if (typeof token !== "undefined") {
//     req.token = token;
//     next();
//   } else {
//     next();
//   }
// };
