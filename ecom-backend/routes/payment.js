const express = require("express");
const router = express.Router();
const paymentControllers = require("../controllers/payment");
const isAuth = require("../middleware/isAuth");

router.post("/razorpay", isAuth, paymentControllers.postPayment);

module.exports = router;
