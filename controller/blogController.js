
const User = require('../models/user');
const Blog = require('../models/blogs')
const jwt = require('jsonwebtoken');


exports.blogs_list = function(req, res, next) {

  jwt.verify(req.token, 'secretkey', async (err, authData) => {
    const result = await Blog.find().populate('user', "username");
    if(err) {
      res.status(403).json({
        message: 'Show Blogs... (limited Access: Not a user)',
        blogs: "get blogs from db",
        result
      });
    } else {

      // get blogs from database
      res.json({
        message: 'Show Blogs...',
        authData,
        blogs: "get blogs from db",
        result
      });
    }
  });
}