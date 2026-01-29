import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json(cart);
};

// ✅ REGISTER THE ROUTE (THIS WAS MISSING)
router.get("/", protect, getCart);

// Add to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    i => i.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();

  const populatedCart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  res.json(populatedCart);
});

// Remove item
router.delete("/:productId", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    i => i.product.toString() !== req.params.productId
  );

  await cart.save();

  const populatedCart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  res.json(populatedCart);
});

router.delete("/clear", protect, async (req, res) => {
  await Cart.findOneAndUpdate(
    { user: req.user.id },
    { items: [] }
  );
  res.json({ message: "Cart cleared" });
});


export default router;
