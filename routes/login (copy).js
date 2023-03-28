var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {

  
  res.json({token: "verified TOken"});
});

router.post('/register/:userID/:userPW', function(req, res, next) {
  // hash password and salt
  console.log(req);



  
  res.json({token: "verified TOken"});
});



module.exports = router;


// helper functions

function genPassword(password){
  var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}