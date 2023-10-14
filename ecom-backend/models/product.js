const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productBrand: {
    type: String,
    required: true,
  },
  productRating: {
    type: Number,
    required: true,
  },
  productDiscount: {
    type: Number,
    required: true,
  },
  productReviews: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
