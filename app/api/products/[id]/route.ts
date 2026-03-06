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

// GET single product
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Get product error:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching product' },
            { status: 500 }
        );
    }
}

// PUT update product (Admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await dbConnect();

        const body = await request.json();

        const product = await Product.findByIdAndUpdate(
            id,
            { ...body },
            { new: true, runValidators: true }
        );

        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Product updated successfully',
                product,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update product error:', error);
        return NextResponse.json(
            { success: false, message: 'Error updating product' },
            { status: 500 }
        );
    }
}

// DELETE product (Admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await dbConnect();

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Product deleted successfully',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete product error:', error);
        return NextResponse.json(
            { success: false, message: 'Error deleting product' },
            { status: 500 }
        );
    }
}
