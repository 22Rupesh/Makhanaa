import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    flavor: string;
    weight: string;
    inStock: boolean;
    featured: boolean;
    bulkAvailable: boolean;
    minBulkQuantity: number;
    bulkPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            min: [0, 'Price cannot be negative'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            enum: ['snacks', 'organic', 'flavored', 'premium'],
            default: 'snacks',
        },
        flavor: {
            type: String,
            required: [true, 'Please provide a flavor'],
        },
        weight: {
            type: String,
            default: '100g',
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        bulkAvailable: {
            type: Boolean,
            default: false,
        },
        minBulkQuantity: {
            type: Number,
            default: 10,
            min: [1, 'Minimum bulk quantity must be at least 1'],
        },
        bulkPrice: {
            type: Number,
            default: 0,
            min: [0, 'Bulk price cannot be negative'],
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', ProductSchema);
