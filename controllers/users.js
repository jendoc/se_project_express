const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("Conflict");
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name: name,
          avatar: avatar,
          email: email,
          password: hash,
        })
          .then(() =>
            res
              .setHeader("Content-Type", "application/json")
              .status(201)
              .send({ name, avatar, email })
          )
          .catch((err) => {
            handleError(err, req, res);
          });
      });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// READ
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      //res.send({ message: err.message });
      handleError(err, req, res);
    });
};

// READ:ID
module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      console.log(req.params)
      res.status(200).send({ user });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// UPDATE
module.exports.updateUser = (req, res) => {
  const { name, avatar, userId } = req.params;

  User.findByIdAndUpdate(
    { userId },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

// LOGIN
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ userId: user.userId }, `${JWT_SECRET}`, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
      //handleError(err, req, res);
    });
};
