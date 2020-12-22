const usersRouter = require('express').Router();
const {
  getUser,
  createUser,
  login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { signUpBodyValidation, signInBodyValidation } = require('../middlewares/validation');

usersRouter.get('/users/me', auth, getUser);

usersRouter.post('/signin', signInBodyValidation, login);

usersRouter.post('/signup', signUpBodyValidation, createUser);

module.exports = usersRouter;
