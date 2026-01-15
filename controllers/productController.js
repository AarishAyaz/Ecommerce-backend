import Product from "../models/Product.js";

export const createProduct = async (req,res)=>{
    const product = await Product.create(req.body);
    res.status(200).json(product);
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

export const updateProduct = async (req, res)=>{
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true
    });
    res.json(updated)
}

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