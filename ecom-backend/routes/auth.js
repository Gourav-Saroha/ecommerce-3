const express = require("express");
const authController = require("../controllers/auth");
const { body } = require("express-validator");
const User = require("../models/user");
const router = express.Router();

router.post(
  "/register",
  [
    body("payload.firstName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("First Name Validation failed"),
    body("payload.lastName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Last Name Validation failed"),
    body("payload.email")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail(),
    body("payload.password")
      .isLength({ min: 5 })
      .withMessage("password validation failed"),
  ],
  authController.registerUser
);

router.post("/login", authController.loginUser);

module.exports = router;
