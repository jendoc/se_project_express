const router = require("express").Router();

const {
  createClothingItem,
  getClothingItems,
  updateClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CREATE
router.post("/", createClothingItem);

// READ
router.get("/", getClothingItems);

// UPDATE
router.put("/:itemId", updateClothingItem);

// DELETE
router.delete("/:itemId", deleteClothingItem);

// LIKE & DISLIKE
router.put("/:itemId/likes", likeClothingItem);
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
