const Order = require("./../models/orderModel");
const Product = require("./../models/productModel");
const User = require("../models/userModel")
const Cart = require("./../models/cartModel");

exports.placeOrder = async (req, res) => {
  try {
    const {totalAmount, products } = req.body;

    const user = await User.findById(req.user)

    const OrderItems = [];
    for (const product of products) {
      OrderItems.push(product);
    }


    const order = new Order({
      userId : req.user,
      totalAmount,
      product: OrderItems,
    });

    await order.save();

    user.cart = []

    await user.save()


    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
    console.log(err);
  }
};




exports.getOrderDetail = async (req, res) => {          // implement product detail after clicking
  try {
    // const userId = req.params.userId;

    const order = await Order.find({ userId: req.user });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },                                    // added status field
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      status: "ok",
      data: {
        order: updatedOrder,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", err });
  }
};


