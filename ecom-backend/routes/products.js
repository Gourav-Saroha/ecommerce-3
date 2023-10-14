const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const productControllers = require("../controllers/products");
router.post("/add-product", productControllers.addProduct);
router.get("/get-products", productControllers.getProducts);
router.get("/get-product/:id", productControllers.getProduct);

router.get("/search", productControllers.searchProducts);

module.exports = router;
