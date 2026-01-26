import express from "express";
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from "../controllers/articleController.js"
import { protect, admin } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.put("/:id",protect, admin,upload.single("image"), updateArticle);
router.delete("/:id",protect, admin, deleteArticle);


export default router;