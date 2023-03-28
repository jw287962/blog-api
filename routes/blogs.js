var express = require('express');
var router = express.Router();
const verifyToken = require('../passport').verifyToken;
const jwt = require('jsonwebtoken');

const auth_Controller = require('../controller/authController');

/* GET users listing. */
// auth user token 
router.use(verifyToken);

router.get('/',function(req, res, next) {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json({
        message: 'Show Blogs... (limited Access: Not a user)',
        authData
      });;
    } else {
      res.json({
        message: 'Show Blogs...',
        authData
      });
    }
  });
});


router.get('/:blogid')

module.exports = router;


// helper functions
