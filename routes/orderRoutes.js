import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const items = cart.items.map(i => ({
    product: i.product._id,
    quantity: i.quantity,
    price: i.product.price
  }));

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = new Order({
    user: req.user.id,
    items,
    totalAmount
  });

  await order.save();
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});

export default router;
