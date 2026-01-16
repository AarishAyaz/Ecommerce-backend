import express from "express";
import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from "../controllers/articleController.js"
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createArticle);
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.put("/:id",protect, admin, updateArticle);
router.delete("/:id",protect, admin, deleteArticle);


export default router;