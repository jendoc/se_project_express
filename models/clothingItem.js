const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Must be a valid URL",
    },
  },
  owner: {
    // ?  a link to the item author's model of the ObjectId type
    type: String,
    //required: true,
  },
  likes: {
    //? a list of users who liked the item, an ObjectId array with a reference to the user modal (empty by default)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
