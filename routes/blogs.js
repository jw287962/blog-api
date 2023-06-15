var express = require("express");
var router = express.Router();

const blog_Controller = require("../controller/blogController");
const jwt = require("jsonwebtoken");
/* GET users listing. */
// auth user token
router.use(jwtVerify);

function jwtVerify(req, res, next) {
  if (req.headers.token) {
    jwt.verify(req.headers.token, "secretkey", async (err, authData) => {
      if (err) {
        console.log(err);
        req.error = err;
        next();
      } else {
        console.log(authData);
        req.authData = authData;
        next();
      }
    });
  } else {
    req.error = "Not User";
    next();
  }
}

router.get("/", blog_Controller.blogs_list);

// get single blogpost
router.get("/:blogid", blog_Controller.blogs_id);
router.post("/", blog_Controller.create_blog_post);

module.exports = router;

// helper functions
