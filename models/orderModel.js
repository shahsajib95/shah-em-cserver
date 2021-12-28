import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: String,
    cart: Array,
    total: Number,
    paymentId: String,
    method: String,
    status: {
        type: String,
        default: 'Accepted'
    },
    dateOfPayment: Date
}, {
    timestamps: true
})

export default mongoose.model("order", orderSchema);