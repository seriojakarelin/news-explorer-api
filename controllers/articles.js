const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getArticles = ((req, res, next) => {
  Article.find({})
    .then((data) => {
      res.status(200).send(data);
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
      res.status(200).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации');
      }
      throw err;
    })
    .catch(next);
});

module.exports.deleteArticle = ((req, res, next) => {
  Article.findById({ _id: req.params.id })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .select('+owner')
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления карточки');
      }
      Article.deleteOne(article)
        .then(() => {
          res.status(200).send(article);
        });
    })
    .catch(next);
});
