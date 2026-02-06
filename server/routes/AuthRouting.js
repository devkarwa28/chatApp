let express = require('express');
const { registerUser, loginUser } = require('../controller/authController');

const AuthRouter = express.Router();

AuthRouter.post('/register',registerUser);
AuthRouter.post('/login',loginUser);

module.exports = AuthRouter;