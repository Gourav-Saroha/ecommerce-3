const User = require("../models/user");
const user = require("../models/user");
const product = require("../models/product");
const order = require("../models/order");
const { default: mongoose } = require("mongoose");

exports.getUserDetails = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.getOrders = (req, res, next) => {
  const userId = req.userId;
  order
    .find({ "user.userId": userId })
    .sort({ createdAt: -1 })
    .then((data) => {
      if (!data) {
        const error = new Error("No orders found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.addToWishList = (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.id;
  let loadedUser;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      const product = {
        productId: productId,
      };
      return user.wishlist.push(product);
    })
    .then(() => {
      return loadedUser.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "Added to wishlist", data: loadedUser.wishlist });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.removeFromWishlist = async (req, res, next) => {
  const userId = req.userId;
  const productId = req.params.id;

  try {
    const uu = await user.findByIdAndUpdate(
      { _id: userId },
      { $pull: { wishlist: { productId: productId } } },
      { new: true }
    );
    const response = await uu.populate("wishlist.productId");
    // console.log(response.wishlist);
    return res.status(200).json({
      message: "Removed from wishlist",
      data: response.wishlist,
    });
  } catch (error) {}
};

exports.getWishlist = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .populate("wishlist.productId")
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Wishlist", data: user.wishlist });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.addToCart = async (req, res, next) => {
  const prodId = req.params.id;
  const userId = req.userId;
  const loadedUser = await user.findById(userId);
  user
    .findById(userId)
    .populate("cart.items.productId")
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      // console.log(user.cart.items);
      return product.findById(prodId.toString());
    })
    .then((product) => {
      let totalP = 0;
      if (!product) {
        const error = new Error("No Product Found");
        error.statusCode = 404;
        throw error;
      }
      const prodIndex = loadedUser.cart.items.findIndex((cp) => {
        return cp.productId.toString() === prodId.toString();
      });

      console.log(prodIndex);
      let newQuantity = 1;
      let p = 0;
      const updatedCart = loadedUser.cart.items;
      if (prodIndex >= 0) {
        newQuantity = updatedCart[prodIndex].quantity + 1;
        p = updatedCart[prodIndex].price * newQuantity;
        updatedCart[prodIndex].quantity = newQuantity;
        updatedCart[prodIndex].price = product.productPrice;
        updatedCart[prodIndex].subTotal = p;
      } else {
        loadedUser.cart.items.push({
          productId: product._id,
          quantity: newQuantity,
          price: product.productPrice,
          subTotal: product.productPrice,
        });
      }
      loadedUser.cart.items.forEach((i) => {
        totalP += i.subTotal;
      });
      loadedUser.cart.totalPrice = totalP;
    })
    .then(() => {
      return loadedUser.save();
    })
    .then(() => {
      return loadedUser.populate("cart.items.productId");
    })
    .then(() => {
      res.status(200).json({ message: "Added product", data: loadedUser.cart });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.removeFromCart = async (req, res, next) => {
  const userId = req.userId;
  const prodId = req.params.id;
  let newQuantity;
  let totalP = 0;

  const loadedUser = await user.findById(userId);
  user
    .findById(userId)
    .populate("cart.items.productId")
    .then((user) => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      console.log(user.cart.items);
      return product.findById(prodId.toString());
    })
    .then((product) => {
      if (!product) {
        const error = new Error("No Product Found");
        error.statusCode = 404;
        throw error;
      }
      const prodIndex = loadedUser.cart.items.findIndex((item) => {
        return item.productId.toString() === prodId.toString();
      });
      let p = 0;
      console.log("INDEXX", prodIndex);

      let updatedCart = loadedUser.cart.items;
      if (prodIndex >= 0) {
        if (updatedCart[prodIndex].quantity === 1) {
          updatedCart = updatedCart.filter((prod) => {
            return prod.productId.toString() !== prodId;
          });
        } else {
          newQuantity = updatedCart[prodIndex].quantity - 1;
          updatedCart[prodIndex].price = product.productPrice;
          p = updatedCart[prodIndex].price * newQuantity;
          updatedCart[prodIndex].quantity = newQuantity;
          updatedCart[prodIndex].subTotal = p;
        }
      }
      loadedUser.cart.items = updatedCart;
      loadedUser.cart.items.forEach((i) => {
        totalP += i.subTotal;
      });
      loadedUser.cart.totalPrice = totalP;
    })

    .then(() => {
      return loadedUser.save();
    })
    .then(() => {
      return loadedUser.populate("cart.items.productId");
    })
    .then(() => {
      res
        .status(200)
        .json({ message: "removed product", data: loadedUser.cart });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  user
    .findById(userId)
    .populate("cart.items.productId")
    .then((u) => {
      if (!user) {
        const err = new Error("No user Found");
        err.statusCode = 404;
        throw err;
      }
      const products = u.cart.items;
      res.status(200).json({ message: "Cart items", data: products });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.postOrder = async (req, res, next) => {
  const userId = req.userId;
  const aId = req.body.payload.selectedAddress;
  const totalPrice = req.body.payload.totalPrice;
  const paymentId = req.body.payload.paymentId;
  let loadedUser;
  user
    .findById(userId)
    .populate("cart.items.productId")
    .then((user) => {
      loadedUser = user;
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      }
      const prods = user.cart.items.map((p) => {
        return { quantity: p.quantity, product: { ...p.productId._doc } };
      });
      const Order = new order({
        user: {
          name: user.firstName,
          userId: user._id,
        },
        products: prods,
        address: aId,
        totalAmount: totalPrice,
        paymentId: paymentId,
      });
      return Order.save();
    })
    .then((resp) => {
      console.log(resp);
      loadedUser.cart = { items: [] };
      loadedUser.save();
      res
        .status(201)
        .json({ message: "Order Placed successfully", id: resp._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};
