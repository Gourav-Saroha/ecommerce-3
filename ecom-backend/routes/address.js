const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");
const addressControllers = require("../controllers/address");
const { body } = require("express-validator");

router.post(
  "/add-address",
  [
    body("payload.name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Name Validation failed"),
    body("payload.address")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Address Validation failed"),
    body("payload.pincode")
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage("Pincode Validation failed"),
    body("payload.city")
      .trim()
      .isLength({ min: 1 })
      .withMessage("City Validation failed"),
    body("payload.state")
      .trim()
      .isLength({ min: 1 })
      .withMessage("State Validation failed"),
    body("payload.country")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country Validation failed"),
    body("payload.mobile")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile Phone Validation failed"),
  ],
  isAuth,
  addressControllers.addAddress
);
router.get("/get-addresses", isAuth, addressControllers.getAddresses);
router.delete("/remove-address/:id", isAuth, addressControllers.removeAddress);
router.put(
  "/edit-address/:id",
  [
    body("payload.name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Name Validation failed"),
    body("payload.address")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Address Validation failed"),
    body("payload.pincode")
      .trim()
      .isLength({ min: 6, max: 6 })
      .withMessage("Pincode Validation failed"),
    body("payload.city")
      .trim()
      .isLength({ min: 1 })
      .withMessage("City Validation failed"),
    body("payload.state")
      .trim()
      .isLength({ min: 1 })
      .withMessage("State Validation failed"),
    body("payload.country")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country Validation failed"),
    body("payload.mobile")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile Phone Validation failed"),
  ],
  isAuth,
  addressControllers.editAddress
);

module.exports = router;
