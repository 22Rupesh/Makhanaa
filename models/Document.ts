import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        required: true,
    },
    expiryDate: {
        type: Date,
        default: null,
    },
    batchNumber: {
        type: String,
        default: 'N/A',
    },
    status: {
        type: String,
        enum: ['Valid', 'Latest', 'Expired'],
        default: 'Valid',
    },
    fileData: {
        type: String, // base64 encoded file
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
