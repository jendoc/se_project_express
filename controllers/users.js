const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT_SECRET = require("../utils/config");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email })
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
        .then((user) =>
          res.setHeader("Content-Type", "application/json").status(201).send({
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          })
        )
    });
  }).catch((err) => {
    handleError(err, res);
  });;
};

// // READ
// module.exports.getUsers = (res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch((err) => {
//       handleError(err, res);
//     });
// };

// READ:ID
module.exports.getCurrentUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, res);
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
      handleError(err, res);
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
      return token;
    })
    .catch((err) => {
      res.status(401).send({ message: "problem with login", err})
      //handleError(err, res);
    });
};
