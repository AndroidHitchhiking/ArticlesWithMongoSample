var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Connected to server @ port 3030')
});

module.exports = router;
