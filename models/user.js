const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Elise Bouer",
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Must be a valid URL",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Must be a valid email",
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
  },
});
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("users", userSchema);
