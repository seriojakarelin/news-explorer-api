const articlesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { articleCreateValidation } = require('../middlewares/validation/articlecreate-validation');
const { auth } = require('../middlewares/auth');

articlesRouter.get('/articles', auth, getArticles);

articlesRouter.post('/articles', auth, celebrate(articleCreateValidation), createArticle);

articlesRouter.delete('/articles/:id', auth, deleteArticle);

module.exports = articlesRouter;
