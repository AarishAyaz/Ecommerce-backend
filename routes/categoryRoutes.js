import express from 'express';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController.js";
import { uploadCategoryImage } from "../middlewares/upload.js";
import {protect, admin} from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", getCategories)
router.get("/:id", getCategoryById)

//admin protected routes
router.post("/", protect, admin, uploadCategoryImage.single("image"), createCategory)
router.put("/:id", protect, admin, uploadCategoryImage.single("image"), updateCategory)
router.delete("/:id", protect, admin, deleteCategory)

export default router;