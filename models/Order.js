import mongoose from 'mongoose'
import Product from './Product'

const OrderSChema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    },
    items:[
        {
            Product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
            quantity: Number
        },
    ],
    totalPrice: Number,
    status:{
        type:String,
        default: Pending
    }
}, {timestamps:true})

export default mongoose.model ("Order", OrderSChema)