const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        product: { type: Object, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    user: {
      name: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, required: true },
    },
    address: { type: Object, required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
