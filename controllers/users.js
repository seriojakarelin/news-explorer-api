const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const {
  userIdNotFoundErr,
  validationErr,
  sameEmailErr,
  wrongPassOrEmailErr,
} = require('../constants');

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError(userIdNotFoundErr))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(validationErr);
      }
      throw err;
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(sameEmailErr);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((createdUser) => {
      const user = {
        name: createdUser.name,
        email: createdUser.email,
      };
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(validationErr);
      }
      throw error;
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(wrongPassOrEmailErr);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(wrongPassOrEmailErr);
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { noTimestamp: true, expiresIn: '7d' });

        return res.send({ token });
      });
    })
    .catch(next);
};
