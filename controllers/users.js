const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

// const { handleError } = require("../utils/errors");
const ConflictError = require("../errors/conflict");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const UnauthorizedError = require("../errors/unauthorized");

// CREATE
module.exports.createUser = (req, res, next) => {
  const {
    name, avatar, email, password,
  } = req.body;
  console.log(req.body);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new ConflictError("User with this email already exists");
        return next(error);
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          avatar,
          email,
          password: hash,
        })
          .then((data) => res.setHeader("Content-Type", "application/json").send({
            name: data.name,
            avatar: data.avatar,
            email: data.email,
          }))
          .catch((err) => {
            if (err.name === "ValidationError") {
              next(new BadRequestError("Invalid data"));
            } else {
              next(err);
            }
          });
      });
    })
    .catch((err) => {
      next(err);
    });
};

// READ:ID
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User ID not found"))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

// UPDATE
module.exports.updateUser = (req, res, next) => {
  const { name, avatar, token } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar, token },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError("User ID not found"))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "super-secret",
        {
          expiresIn: "7d",
        },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};
