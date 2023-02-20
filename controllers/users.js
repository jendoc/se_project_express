const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

//const { handleError } = require("../utils/errors");
const { ConflictError } = require("../errors/conflict");

// CREATE
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
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
          .then((data) =>
            res.setHeader("Content-Type", "application/json").send({
              name: data.name,
              avatar: data.avatar,
              email: data.email,
            })
          )
          .catch((err) => {
            next(err);
          });
      });
    })
    .catch((err) => {
      next(err);
    });
};

// // READ
// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       next(err)
//     });
// };

// READ:ID
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

// UPDATE
module.exports.updateUser = (req, res) => {
  const { name, avatar, token } = req.body;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name, avatar, token },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ user }))
    .catch((err) => {
      next(err);
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
      next(err);
    });
};
