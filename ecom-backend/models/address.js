const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Name: { type: String, required: true },
  AddressLine1: { type: String, required: true },
  City: { type: String, required: true },
  State: { type: String, required: true },
  Country: { type: String, required: true },
  Pincode: { type: Number, required: true },
  Mobile: { type: Number, required: true },
});

module.exports = mongoose.model("Address", addressSchema);
