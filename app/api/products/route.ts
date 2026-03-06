import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to verify admin
function verifyAdmin(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        return decoded.role === 'admin' ? decoded : null;
    } catch {
        return null;
    }
}

// GET all products
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const products = await Product.find({}).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                count: products.length,
                products,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Get products error:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching products' },
            { status: 500 }
        );
    }
}

// POST create new product (Admin only)
export async function POST(request: NextRequest) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const { name, description, price, image, category, flavor, weight, inStock, featured } = body;

        // Validation
        if (!name || !description || !price || !image || !flavor) {
            return NextResponse.json(
                { success: false, message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category: category || 'snacks',
            flavor,
            weight: weight || '100g',
            inStock: inStock !== undefined ? inStock : true,
            featured: featured || false,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Product created successfully',
                product,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create product error:', error);
        return NextResponse.json(
            { success: false, message: 'Error creating product' },
            { status: 500 }
        );
    }
}
