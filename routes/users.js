const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUser,
  createUser,
  login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { signValidation } = require('../middlewares/validation/sign-validation');

usersRouter.get('/users/me', auth, getUser);

usersRouter.post('/signin', celebrate(signValidation), login);

usersRouter.post('/signup', celebrate(signValidation), createUser);

module.exports = usersRouter;
