import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  res.json(cart || { items: [] });
});

// Add to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Remove item
router.delete("/:productId", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await cart.save();
  res.json(cart);
});

export default router;
