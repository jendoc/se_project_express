const router = require("express").Router();

const auth = require('./middleware/auth')

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
//TODO user rights

// DELETE
router.delete("/:itemId", auth, deleteClothingItem);
//TODO user rights

// LIKE & DISLIKE
router.put("/:itemId/likes", auth, likeClothingItem);
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
