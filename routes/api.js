var express = require('express');
var router = express.Router();


const auth_Controller = require('../controller/authController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// login  returns TOKEN
router.get('/login/:userID/:userPW/', auth_Controller.login);

// register a new account to login
router.post('/register/:userID/:userPW/', auth_Controller.register);



module.exports = router;


// helper functions
