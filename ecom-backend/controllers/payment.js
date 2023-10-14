const shortid = require("shortid");
const Razorpay = require("razorpay");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

exports.postPayment = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  const payment_capture = 1;
  const amount = user.cart.totalPrice;
  const discount = amount / 10;
  console.log(discount);
  const finalAmount = amount - discount;
  console.log(finalAmount);
  const currency = "INR";
  const options = {
    amount: parseInt(finalAmount * 100),
    currency,
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};
