const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

// GET
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, updateUser);

module.exports = router;
