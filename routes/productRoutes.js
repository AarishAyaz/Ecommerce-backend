import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsbyCategory
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/", getProductsbyCategory);
router.post("/",protect,admin, upload.single("image"),createProduct);

// Admin only
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
