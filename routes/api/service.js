var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respondiendo mi primer get ----!!');
});

module.exports = router;
