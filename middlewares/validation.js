const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// validate clothing item body when item is created
module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    // - item name is required string between 2 and 30 chars
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'The minimun length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field cannot be empty',
      }),
    // - an image url is a required string in a url format
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field cannot be empty',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

// validate user info body when user is created
module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    // - the username is a string of between 2 and 30 chars
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'The minimun length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field cannot be empty',
      }),
    // - the user avatar is a required string in a url format
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field cannot be empty',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    // - email is a required string in a valid email format
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email',
    }),
    // - password is a required string
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

// authenticate when user logs in
module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    // - email is a required string in a valid email format
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email',
    }),
    // - password is a required string
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

// user and clothing items IDs when they are accessed
module.exports.validateIds = celebrate({
  body: Joi.object().keys({
    // - IDs must be a hexadecimal value length of 24 chars
    _id: Joi.min(24).messages({}),
  }),
});
