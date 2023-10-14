const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
router.get("/details", isAuth, userControllers.getUserDetails);
router.get("/orders", isAuth, userControllers.getOrders);
router.get("/wishlist", isAuth, userControllers.getWishlist);

router.post("/add-to-wishlist/:id", isAuth, userControllers.addToWishList);
router.delete(
  "/remove-from-wishlist/:id",
  isAuth,
  userControllers.removeFromWishlist
);
router.post("/add-to-cart/:id", isAuth, userControllers.addToCart);
router.delete("/delete-from-cart/:id", isAuth, userControllers.removeFromCart);
router.get("/cart", isAuth, userControllers.getCart);

router.post("/order", isAuth, userControllers.postOrder);

module.exports = router;
