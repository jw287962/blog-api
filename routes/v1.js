var express = require('express');
var router = express.Router();
const apiRouter = require('../routes/api')
/* GET users listing. */
router.use('/api',apiRouter);

router.get('/', function(req, res, next) {
  res.send('v1 Response');
});

module.exports = router;
