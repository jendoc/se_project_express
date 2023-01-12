const router = require("express").Router();
const user = require("./user");
const clothingItem = require("./clothingItem");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
