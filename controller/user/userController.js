var express = require('express');
var router = express.Router();
const user = require('../../services/user/userService');

router.get('/', function(req, res, next) {
  user.getUsers(req, res);
});

router.post('/', function(req, res, next) {
  user.createUser(req, res);
});
module.exports = router;
