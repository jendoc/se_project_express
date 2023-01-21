const User = require("../models/user");
const bcrypt = require("bcryptjs");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  return User.findOne({ email }).then((user) => {
    if (user) {
      res.status(409).send(err);
    }
    bcrypt.hash(password, 10).then((hash) =>
      User.create({
        name: name,
        avatar: avatar,
        email: email,
        password: hash,
      }).catch((e) => {
        handleError(e, res);
      })
    );
  });
};

// READ
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      handleError(e, res);
    });
};

// READ:ID
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      handleError(e, res);
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
      res.status(401).send({ message: err.message });
    });
};
