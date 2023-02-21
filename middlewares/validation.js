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
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'The minimun length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field cannot be empty',
      }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field cannot be empty',
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().required().messages({
      "string.empty": "Field is required",
    }),
  }),
});

// validate user info body when user is updated
module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'The minimun length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field cannot be empty',
      }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field cannot be empty',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
  }),
});

// validate user info body when user is created
module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": 'The minimun length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field cannot be empty',
      }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field cannot be empty',
      "string.uri": 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

// authenticate when user logs in
module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field cannot be empty',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field cannot be empty',
    }),
  }),
});

// user and clothing items IDs when they are accessed
module.exports.validateIds = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex.required(),
  }),
});
