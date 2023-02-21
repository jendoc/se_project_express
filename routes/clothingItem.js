const router = require("express").Router();

const auth = require("../middlewares/auth");
const { validateIds, validateCardBody } = require("../middlewares/validation");

const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

// CREATE
router.post("/", auth, validateCardBody, createClothingItem);

// READ
router.get("/", getClothingItems);

// DELETE
router.delete("/:itemId", auth, validateIds, deleteClothingItem);

// LIKE & DISLIKE
router.put("/:itemId/likes", auth, validateIds, likeClothingItem);
router.delete("/:itemId/likes", auth, validateIds, dislikeClothingItem);

module.exports = router;
