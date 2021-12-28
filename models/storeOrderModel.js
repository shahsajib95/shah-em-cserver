import mongoose from 'mongoose'

const storeOrderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: 'order'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    storeId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    title: String,
    quanity: Number,
    price: Number,
    status: String,
    dateOfPayment: String
}, {
    timestamps: true
})

export default mongoose.model("storeOrder", storeOrderSchema);