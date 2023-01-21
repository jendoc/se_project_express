const router = require("express").Router();
const auth = require("../middlewares/auth");

const user = require("./users");
const clothingItem = require("./clothingItem");

router.use("/items", auth, clothingItem);
router.use("/users", auth, user);

module.exports = router;
