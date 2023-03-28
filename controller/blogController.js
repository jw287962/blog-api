
const User = require('../models/user');
const Blog = require('../models/blogs')
const jwt = require('jsonwebtoken');


exports.blogs_list = function(req, res, next) {

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.status(403).json({
        message: 'Show Blogs... (limited Access: Not a user)'
      });
    } else {
      res.json({
        message: 'Show Blogs...',
        authData
      });
    }
  });
}