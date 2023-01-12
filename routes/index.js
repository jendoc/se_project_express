const router = require("express").Router();

const user = require("./user");

const clothingItem = require("./clothingItem");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
