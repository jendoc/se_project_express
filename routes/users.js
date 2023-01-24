const router = require("express").Router();

const {
  getCurrentUser,
  updateUser,
  getUsers,
} = require("../controllers/users");

// GET
router.get("/", getUsers);
router.get("/me", getCurrentUser);

// UPDATE
router.patch("/me", updateUser);

module.exports = router;
