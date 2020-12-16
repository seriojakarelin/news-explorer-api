const { Joi } = require('celebrate');

module.exports.articleCreateValidation = {
  body: Joi.object().keys({
    keyword: Joi.string()
      .required(),
    title: Joi.string()
      .required(),
    text: Joi.string()
      .required(),
    date: Joi.string()
      .required(),
    source: Joi.string()
      .required(),
    link: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
    image: Joi.string()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i)
      .required(),
    owner: Joi.string()
      .alphanum()
      .length(24),
  }),
};
