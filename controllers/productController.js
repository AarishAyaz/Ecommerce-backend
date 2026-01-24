import Product from "../models/Product.js";

export const createProduct = async (req,res)=>{
    try {
        const product = await Product.create({
            ...req.body,
            image: req.file.filename
        });
        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({message:"Server Error"});        
    }
}

export const getProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product
      .find(filter)
      .populate("category", "name");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res)=>{
    const product = await Product.findById(req.params.id).populate("category");
    if(!product) return res.status(404).json({message:"Product not found"})
    res.json(product)
}

export const updateProduct = async (req, res) => {
  try {
    // req.body will always be an object, even with multipart/form-data
    const body = req.body || {};

    // Find the product first
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update fields only if they exist
    if (body.name) product.name = body.name;
    if (body.price) product.price = Number(body.price);
    if (body.description) product.description = body.description;
    if (body.category) product.category = body.category;
    if (body.brand) product.brand = body.brand;
    if (body.countInStock) product.countInStock = Number(body.countInStock);

    // Handle image
    if (req.file) {
      product.image = req.file.filename;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};



export const deleteProduct = async (req, res)=>{
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({message:"product deleted"})
}

export const getProductsbyCategory = async (req, res) =>{
    try {
        const filter = {};
        if(req.query.category) {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter).populate("category");
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message:"Server Error"
        });
    }
}