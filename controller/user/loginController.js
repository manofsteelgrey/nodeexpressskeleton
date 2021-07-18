var express = require('express');
var router = express.Router();
const loginService = require('../../services/user/loginService');

router.post('/', function(req, res, next) {
  loginService.validateUser(req,res);
});
module.exports = router;
