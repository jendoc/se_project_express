const router = require("express").Router();

const { getUsers, createUser, getUser } = require("../controllers/user");

//POST
router.post("/", createUser);

//GET
router.get("/", getUsers);

//GET:ID
router.get("/:userId", getUser);

module.exports = router;
