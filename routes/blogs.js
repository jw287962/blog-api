var express = require('express');
var router = express.Router();
const verifyToken = require('../passport').verifyToken;

const auth_Controller = require('../controller/authController');
const blog_Controller = require('../controller/blogController')

/* GET users listing. */
// auth user token 
router.use(verifyToken);

router.get('/',blog_Controller.blogs_list);


router.get('/:blogid')

module.exports = router;


// helper functions
