const express = require('express');
const router = express.Router();
const app = express();

const usersRouter = require('../controller/user/userController');
const loginRouter = require('../controller/user/loginController');
const registerRouter = require('../controller/user/registerController');


app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

module.exports = router;
