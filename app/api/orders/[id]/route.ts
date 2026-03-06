import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

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

// GET single order
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const order = await Order.findById(id).populate('userId', 'name email');

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                order,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Get order error:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching order' },
            { status: 500 }
        );
    }
}

// PUT update order status (Admin only)
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
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { success: false, message: 'Please provide order status' },
                { status: 400 }
            );
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Order status updated successfully',
                order,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update order error:', error);
        return NextResponse.json(
            { success: false, message: 'Error updating order' },
            { status: 500 }
        );
    }
}
