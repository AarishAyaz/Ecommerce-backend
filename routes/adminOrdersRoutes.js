import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ✅ Get ALL orders (Admin) */
router.get("/all", protect, adminOnly, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "name price image")
    .sort({ createdAt: -1 });

  res.json(orders);
});

/* ✅ Get single order (Admin) */
router.get("/:id", protect, adminOnly, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.product", "name price image");

  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json(order);
});

/* ✅ Update order status */
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  await order.save();

  res.json({ message: "Order status updated", order });
});

export default router;
