const router = require("express").Router();

const { getUsers, createUser, getUser } = require("../controllers/user");

// GET /users/me
//! Get current user based on _id of logged in user

module.exports = router;
