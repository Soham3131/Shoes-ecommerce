// src/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        size: { type: String, required: true }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    customerLocation: {
        latitude: { type: Number, },
        longitude: { type: Number,}
    },
    customerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status: { type: String, enum: ['pending', 'out for delivery', 'delivered', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, required: true, default: 'Razorpay' },
    paymentResult: { 
        id: { type: String },
        status: { type: String },
        update_time: { type: String }
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    isCancelled: { type: Boolean, required: true, default: false }, // New 
    // field
    isReplaced: { type: Boolean, default: false }, // New field
    isReturned: { type: Boolean, default: false } ,// New field for clarity
    deliveredAt: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);