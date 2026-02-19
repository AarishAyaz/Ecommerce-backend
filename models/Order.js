import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number
    }
  ],
  shippingInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: String,

  subtotal: Number,
  tax: Number,
  shipping: Number,
  total: Number,

  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
