const router = require("express").Router();

const auth = require("../middlewares/auth");

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CREATE
router.post("/", auth, createClothingItem);

// READ
router.get("/", getClothingItems);

// DELETE
router.delete("/:itemId", auth, deleteClothingItem);

// LIKE & DISLIKE
router.put("/:itemId/likes", auth, likeClothingItem);
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
