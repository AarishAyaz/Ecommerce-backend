import User from "../models/User.js"
import Product from "../models/Product.js"
import Category from "../models/Category.js"
import Article from "../models/Article.js"
import Order from "../models/Order.js";

export const getAdminStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalCategories,
            totalArticles,
            totalOrders,
        ]    = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Category.countDocuments(),
            Article.countDocuments(),
            Order.countDocuments(),
        ]);
        res.json({
            totalUsers,
            totalProducts,
            totalCategories,
            totalArticles,
            totalOrders,
        })
    } catch (error) {
        res.status(500).json({message:"Failed to fetch stats"})
    }
}