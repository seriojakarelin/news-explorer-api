const router = require('express').Router();

const usersRouter = require('./users');
const articlesRouter = require('./articles');
const notFoundRouter = require('./notFound');

router.use(
  usersRouter,
  articlesRouter,
  notFoundRouter,
);

module.exports = router;
