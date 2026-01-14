import Product from "../models/Product.js";

export const createProduct = async (req,res)=>{
    const product = await Product.create(req.body);
    res.status(200).json(product);
}

export const getProducts = async (req,res)=>{
    const products = await Product.find();
    res.json(products);
}

export const getProduct = async (req, res)=>{
    const product = await Product.findById(req.params.id);
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