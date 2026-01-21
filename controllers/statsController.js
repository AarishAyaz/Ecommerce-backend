import User from "../models/User.js"
import Product from "../models/Product.js"
import Category from "../models/Category.js"
import Article from "../models/Article.js"

export const getAdminStats = async (req, res) => {
    try {
        const [
            totalUsers,
            totalProducts,
            totalCategories,
            totalArticles,
        ]    = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Category.countDocuments(),
            Article.countDocuments(),
        ]);
        res.json({
            totalUsers,
            totalProducts,
            totalCategories,
            totalArticles,
        })
    } catch (error) {
        res.status(500).json({message:"Failed to fetch stats"})
    }
}