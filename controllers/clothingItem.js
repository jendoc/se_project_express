const ClothingItem = require("../models/clothingItem");

// const { handleError } = require("../utils/errors");
const ForbiddenError = require("../errors/forbidden");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");

// CREATE
module.exports.createClothingItem = (req, res, next) => {
  const userId = req.user._id;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: userId,
  })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

// READ
module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      next(err);
    });
};

// DELETE
module.exports.deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item ID not found"))
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return item.remove(() => res.send({ clothingItem: item }));
      }
      throw new ForbiddenError("Forbidden");
    })
    .catch((err) => {
      next(err);
    });
};

// LIKE
module.exports.likeClothingItem = (req, res, next) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new NotFoundError("Item ID not found"))
  .then((item) => res.send({ data: item }))
  .catch((err) => {
    next(err);
  });

// DISLIKE
module.exports.dislikeClothingItem = (req, res, next) => ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new NotFoundError("Item ID not found"))
  .then((item) => res.send({ data: item }))
  .catch((err) => {
    next(err);
  });
