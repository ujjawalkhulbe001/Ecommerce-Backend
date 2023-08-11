const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  product: [], // to fetch all product detail
  status: { type: String, enum: [ "placed", "cancel" ], default: "placed" }, // added status in order schema 
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
