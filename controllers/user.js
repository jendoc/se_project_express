const User = require("../models/user");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.status(201).send({ data: user });
    })
    .catch((e) => {
      handleError(e, res);
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
