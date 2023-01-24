const ClothingItem = require("../models/clothingItem");

const { handleError, handleAuthError } = require("../utils/errors");

// CREATE
module.exports.createClothingItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// READ
module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      handleError(err, req, res);
    });
};

// DELETE
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (item.owner.equals(req.userId)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      const err = new Error("Unauthorized");
      return handleAuthError(err, req, res);
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// LIKE
module.exports.likeClothingItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      handleError(err, req, res);
    });

// DISLIKE
module.exports.dislikeClothingItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      handleError(err, req, res);
    });
