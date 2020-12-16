const { Joi } = require('celebrate');

module.exports.signValidation = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string()
      .required()
      .email()
      .min(2)
      .max(30),
    password: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
};
