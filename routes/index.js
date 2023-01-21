const router = require("express").Router();

const auth = require("./middlewares/auth");

const user = require("./user");

const clothingItem = require("./clothingItem");

router.use("/items", auth, clothingItem);
router.use("/users", auth, user);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
