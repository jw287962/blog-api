var express = require('express');
var router = express.Router();
const genPassword = require('../passport').genPassword
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {

  
  res.json({token: "verified TOken"});
});

router.post('/register/:userID/:userPW/', async function(req, res, next) {
  // hash password and salt
  // the front end will be where i will need to escape and stuff i guess? before sending it here.
  const {userID, userPW} = req.params;
  const isBlogger = req.query;
  const hashSalt = genPassword(userPW);
  // prob need to search db and see if there is a user already in
  const result = await User.find({username: userID}).exec();
  console.log(result.length);

  if(result.length === 1){
    res.json({message: "user EXISTS"})
  }else{

    try{
      const user = new User({
        username: userID,
        password: hashSalt.hash, //hashed
        salt: hashSalt.salt,
        blogger: isBlogger,
      })
  
     const createUser = await User.create(user);
      console.log(createUser);
  
      res.json({user: userID, blogger: isBlogger, hashed: "hashed", register: "registering user"});
    }catch (e){
        console.error("ERROR:", e);
        res.json({message: "Can't Create User"})
    }
    
  }

  

    
 
});



module.exports = router;


// helper functions
