var express = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Hello from Recipe Homepage");
});

module.exports = router;
