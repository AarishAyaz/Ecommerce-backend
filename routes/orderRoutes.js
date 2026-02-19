import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user.id
  }).populate("items.product", "name price");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

router.get("/", protect, async (req,res)=>{
  const orders = await Order.find({user: req.user.id}).sort({createdAt: -1});
  res.json(orders);
})

router.post("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map(i => ({
    product: i.product._id,
    quantity: i.quantity,
    price: i.product.price
  }));

  /* ===== ORDER CALCULATIONS (BACKEND ONLY) ===== */
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;               // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // free shipping over 100
  const total = subtotal + tax + shipping;
  /* ============================================ */

  const order = new Order({
    user: req.user.id,
    items,
    subtotal,
    tax,
    shipping,
    total,
    shippingInfo: req.body.shippingInfo,
    paymentMethod: req.body.paymentMethod,
    status: "pending"
  });

  await order.save();

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
});


export default router;