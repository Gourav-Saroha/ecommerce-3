const order = require("../models/order");
const product = require("../models/product");
const user = require("../models/user");

exports.addProduct = (req, res, next) => {
  const productId = req.body.productId;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.productPrice;
  const productImage = req.body.productImage;
  const productCategory = req.body.productCategory;
  const productBrand = req.body.productBrand;
  const productRating = req.body.productRating;
  const productDiscount = req.body.productDiscount;
  const productReviews = req.body.productReviews;

  const products = new product({
    productId: productId,
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productImage: productImage,
    productCategory: productCategory,
    productBrand: productBrand,
    productRating: productRating,
    productDiscount: productDiscount,
    productReviews: productReviews,
  });
  products.save();
};

exports.getProducts = (req, res, next) => {
  product
    .find()
    .then((data) => {
      if (!data) {
        const error = new Error("No Products Found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "products fetched", data: data });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next();
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.id;
  product
    .findById(prodId)
    .then((prod) => {
      if (!prod) {
        const error = new Error("No Product Found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Product fetched", data: prod });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next();
    });
};
exports.searchProducts = (req, res, next) => {
  const searchItem = req.query.searchTerm;
  const regex = new RegExp("^" + searchItem, "i");
  product
    .find({
      $or: [
        { productBrand: { $regex: regex } },
        { productCategory: { $regex: regex } },
      ],
    })
    .then((data) => {
      if (!data) {
        const error = new Error("No Products Found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ data: data });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next();
    });
};
