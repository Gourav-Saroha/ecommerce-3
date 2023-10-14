const { default: mongoose } = require("mongoose");
const Address = require("../models/address");
const { validationResult } = require("express-validator");

exports.addAddress = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.payload.name;
  const addressLine1 = req.body.payload.address;
  const city = req.body.payload.city;
  const state = req.body.payload.state;
  const pincode = req.body.payload.pincode;
  const country = req.body.payload.country;
  const mobile = req.body.payload.mobile;

  const userId = req.userId;
  try {
    const address = new Address({
      userId: userId,
      Name: name,
      AddressLine1: addressLine1,
      City: city,
      State: state,
      Pincode: pincode,
      Country: country,
      Mobile: mobile,
    });

    await address.save();

    const updatedAddresses = await Address.find({ userId: userId });
    res.status(200).json({ message: "Address Added", data: updatedAddresses });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

exports.getAddresses = async (req, res, next) => {
  try {
    const userId = req.userId;
    const addresses = await Address.find({ userId: userId });
    res.status(200).json({ message: "Addresses fetched", data: addresses });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

exports.removeAddress = async (req, res, next) => {
  try {
    const userId = req.userId;
    const addressId = req.params.id;
    let address = await Address.findById({ _id: addressId });
    await address.remove();
    const updatedAddresses = await Address.find({ userId: userId });
    res
      .status(200)
      .json({ data: updatedAddresses, message: "address removed" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};

exports.editAddress = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.payload.name;
  const addressLine1 = req.body.payload.address;
  const city = req.body.payload.city;
  const state = req.body.payload.state;
  const pincode = req.body.payload.pincode;
  const country = req.body.payload.country;
  const mobile = req.body.payload.mobile;

  const userId = req.userId;
  const addressId = req.params.id;

  try {
    const address = await Address.findById(addressId);
    if (address.userId.toString() !== userId) {
      throw new Error("Unauthorized");
    }
    address.Name = name;
    address.AddressLine1 = addressLine1;
    address.City = city;
    address.State = state;
    address.Pincode = pincode;
    address.Country = country;
    address.Mobile = mobile;

    await address.save();
    const updatedAddresses = await Address.find({ userId: userId });

    res
      .status(200)
      .json({ data: updatedAddresses, message: "Edit successfull" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};
