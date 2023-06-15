const User = require("../models/user");
const Blog = require("../models/blogs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.blogs_list = async function (req, res, next) {
  const result = await Blog.find().populate("user", "username");
  const authData = req.authData;
  if (req.authData) {
    // get blogs from database
    res.json({
      message: "Show Blogs...",
      authData,
      result,
    });
  } else {
    res.json({
      message: "Show Blogs... (limited Access: Not a user)",
      result,
    });
  }
};

exports.blogs_id = async function (req, res, next) {
  const result = await Blog.find({ id_: req.params.post_id }).populate(
    "user",
    "username"
  );
  const authData = req.authData;
  if (req.authData) {
    // get blogs from database
    res.json({
      message: "Single Blog Fetch",
      authData,
      result,
    });
  } else {
    res.status(403).json({
      message: "Show Single Blog... (limited Access: Not a user)",
      result,
    });
  }
};

// exports.create_blog_post = async function (req, res, next) {};

exports.create_blog_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Add a title to your post!"),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Add content to your blog post"),
  async (req, res, next) => {
    const authData = req.authData;
    const user = await User.find({ username: req.authData.userID });
    if (user[0].blogger) {
      const errors = validationResult(req);
      if (errors.array().length > 0) {
        res.status(400).json({
          errors: errors.array(),
          data: req.body,
        });
      } else {
        try {
          const newBlog = new Blog({
            user: user._id,
            date: new Date(),
            title: req.body.title,
            message: req.body.message,
            comment: [],
          });

          newBlog.save().then((data, err) => {
            if (err) {
              console.log(err);
              next(err);
            } else {
              res.status(200).json({ data });
            }
          });
        } catch (err) {
          if (err) {
            res.error(400).json({ err });
          }
        }
      }
    } else {
      res.status(403).json({
        message: "Please Login as Blogger or Create a new Blogger Account",
      });
    }
  },
];
