import Category from "../models/Category.js";

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Admin
 */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ message: "Category Name and Image are required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, image: `/uploads/${req.file.filename}` });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Failed to create Category" });
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = async (req, res) => {
  try {
    // Sort in MongoDB query, not on JS array
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/**
 * @desc    Get a single category by ID
 * @route   GET /api/categories/:id
 * @access  Admin
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Get Category by ID Error:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

/**
 * @desc    Update a category by ID
 * @route   PUT /api/categories/:id
 * @access  Admin
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = req.body.name ?? category.name;
    category.description = req.body.description ?? category.description;

    // 🔑 CRITICAL FIX
    if (req.file) {
      category.image = `/uploads/${req.file.filename}`;
    }
    // else → keep existing image automatically

    await category.save();

    res.json(category);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Delete a category by ID
 * @route   DELETE /api/categories/:id
 * @access  Admin
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne(); // deleteOne on document
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
