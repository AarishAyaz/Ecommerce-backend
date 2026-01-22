import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type:String,
            required: true
        },
        author:{
            type: String
        },
        published:{
            type: Boolean,
            default: true
        },
        category:{
            type: String
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }
)
export default mongoose.model("Article", articleSchema)