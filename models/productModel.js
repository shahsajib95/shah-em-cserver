import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
}, {
    timestamps: true
})

export default mongoose.model("product", productSchema);
