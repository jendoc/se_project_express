const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  updateUser,
} = require("../controllers/users");
const { validateIds, validateUserUpdate } = require("../middlewares/validation");

// GET
router.get("/me", auth, validateIds, getCurrentUser);

// UPDATE
router.patch("/me", auth, validateUserUpdate, updateUser);

module.exports = router;
