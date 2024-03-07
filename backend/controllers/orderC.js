const Order = require("../models/orderM");
const User = require("../models/usersM");
require("dotenv").config();
const RazorPay = require("razorpay");

exports.purchaseMembership = (req, res) => {
  const amount = 5500;

  const rzp = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  rzp.orders.create({ amount: amount, currency: "INR" }, async (err, order) => {
    try {
      console.log(order);
      if (err) return res.status(500).json(err);
      const orderDetails = await Order.create({
        orderId: order.id,
        status: "PENDING",
        UserId: req.user,
      });
      res.status(201).json({ orderDetails, keyId: rzp.key_id , amount });
    } catch (err) {
      res.status(501).json(err);
    }
  });
};
exports.updateOrder = async (req, res) => {
  try {
    const id = req.user;
    const { paymentId, orderId } = req.body;
    const orderDetails = await Order.findOne({ where: { id: orderId } });
    if (!orderDetails) return res.status(504).json("Server Error");
    await orderDetails.update({ paymentId, status: "SUCCESSFUL" });
    const userDetails = await User.findByPk(id);
    const result= await userDetails.update({ isPremium: true });
    console.log("Order Updated Successfully");
    res.status(200).json("Order Updated Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
