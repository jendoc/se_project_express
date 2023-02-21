const router = require("express").Router();
const auth = require("../middlewares/auth");

const user = require("./users");
const clothingItem = require("./clothingItem");
const NotFoundError = require("../errors/not-found");

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use(auth, (req, res, next) => {
  next(new NotFoundError(`That route doesn't exist`));
});

module.exports = router;
