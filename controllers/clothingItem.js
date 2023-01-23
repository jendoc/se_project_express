const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const { handleError } = require("../utils/errors");

// CREATE
module.exports.createClothingItem = (req, res) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      handleError(err, req, res);
    });
};

// READ
module.exports.getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      handleError(err, req, res);
    });
};

// UPDATE
module.exports.updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, {
    $set: { imageUrl },
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, req, res);
    });
};

// DELETE
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      console.log(item)
      if (item.owner.equals(req.userId)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      return res.status(403).send({
        message: "Forbidden",
      });
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
    .then((item) => res.status(200).send({ data: item }))
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
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleError(err, req, res);
    });
