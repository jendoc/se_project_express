const router = require("express").Router();

const auth = require('../middlewares/auth')

const {
  createClothingItem,
  getClothingItems,
  updateClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CREATE
router.post("/", auth, createClothingItem);

// READ
router.get("/", auth, getClothingItems);

// UPDATE
router.put("/:itemId", auth, updateClothingItem);

// DELETE
router.delete("/:itemId", auth, deleteClothingItem);

// LIKE & DISLIKE
router.put("/:itemId/likes", auth, likeClothingItem);
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
