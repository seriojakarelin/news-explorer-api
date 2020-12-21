const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { paramsIdValidation, articleValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

articlesRouter.get('/articles', auth, getArticles);

articlesRouter.post('/articles', auth, articleValidation, createArticle);

articlesRouter.delete('/articles/:id', auth, paramsIdValidation, deleteArticle);

module.exports = articlesRouter;
