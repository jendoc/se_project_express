const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body)
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name,
          avatar,
          email,
          password: hash,
        })
          .then((data) =>
            res.setHeader("Content-Type", "application/json").send({
              name: data.name,
              avatar: data.avatar,
              email: data.email,
            })
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

// // READ
// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       handleError(err, req, res);
//     });
// };

// READ:ID
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// UPDATE
module.exports.updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

// LOGIN
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};
