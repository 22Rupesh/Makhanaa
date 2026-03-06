import mongoose from 'mongoose';

const BusinessOrderSchema = new mongoose.Schema({
    orderType: {
        type: String,
        enum: ['bulk-quote', 'sample-kit'],
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
    businessType: {
        type: String,
    },
    products: {
        type: Array,
        default: [],
    },
    totalQuantity: {
        type: Number,
        default: 0,
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed'],
        default: 'pending',
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.BusinessOrder || mongoose.model('BusinessOrder', BusinessOrderSchema);
