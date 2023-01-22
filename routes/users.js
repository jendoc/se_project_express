const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser, getUsers } = require("../controllers/users");

// GET
router.get('/', getUsers);
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, updateUser);

module.exports = router;
