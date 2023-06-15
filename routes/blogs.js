var express = require("express");
var router = express.Router();
const verifyToken = require("../passport").verifyToken;

const auth_Controller = require("../controller/authController");
const blog_Controller = require("../controller/blogController");
const jwt = require("jsonwebtoken");
/* GET users listing. */
// auth user token
router.use(verifyToken);
router.use(jwtVerify);

function jwtVerify(req, res, next) {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      req.error = err;
      next();
    } else {
      req.authData = authData;
      next();
    }
  });
}

router.get("/", blog_Controller.blogs_list);

// get single blogpost
router.get("/:blogid", blog_Controller.blogs_id);
router.post("/", blog_Controller.create_blog_post);

module.exports = router;

// helper functions
