const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  incorrectIdErr,
  incorrectArticleUrlErr,
  incorrectImgUrlErr,
} = require('../constants');

const paramsIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .required()
      .custom((value, helpres) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpres.message(incorrectIdErr);
      }),
  }),
});

const signUpBodyValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .trim(),
  }),
});

const signInBodyValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }),
});

const articleValidation = celebrate({
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
    id: Joi.string()
      .alphanum()
      .required(),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!isURL(value)) {
          return helpers.message(incorrectArticleUrlErr);
        }
        return value;
      }),
    image: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!isURL(value)) {
          return helpers.message(incorrectImgUrlErr);
        }
        return value;
      }),
  }),
});

module.exports = {
  paramsIdValidation,
  signUpBodyValidation,
  signInBodyValidation,
  articleValidation,
};
