const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');
const {
  validationErr,
  articleIdNotFoundErr,
  noRightsToDeleteErr,
} = require('../constants');

module.exports.getArticles = ((req, res, next) => {
  Article.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
});

module.exports.createArticle = ((req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      const createdArticle = article.toObject();
      delete createdArticle.owner;
      res.send(createdArticle);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(validationErr);
      }
      throw err;
    })
    .catch(next);
});

module.exports.deleteArticle = ((req, res, next) => {
  Article.findById({ _id: req.params.id })
    .orFail(new NotFoundError(articleIdNotFoundErr))
    .select('+owner')
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError(noRightsToDeleteErr);
      }
      Article.deleteOne(article)
        .then(() => {
          const deletedArticle = article.toObject();
          delete deletedArticle.owner;
          res.send(deletedArticle);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(validationErr);
      }
      throw err;
    })
    .catch(next);
});
