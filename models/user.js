const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Elise Bouer",
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png",
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Must be a valid URL",
    },
  },
  email: {
    required: [true, "Must be a valid email"],
    type: String,
    validate: { validator: (v) => validator.isEmail(v) },
    message: "Must be a valid email",
  },
  password: {
    required: [true, "Please enter a password"],
    type: String,
    minlength: [8, "Password must be at least 8 characters"],
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

module.exports = mongoose.model("user", userSchema);
