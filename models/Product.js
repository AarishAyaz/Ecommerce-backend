import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },       // required
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // must be ObjectId
  image: { type: String },
  brand: { type: String },
  countInStock: { type: Number },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
