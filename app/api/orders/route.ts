import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Helper function to verify token and get user
function verifyToken(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        return decoded;
    } catch {
        return null;
    }
}

// GET all orders (filtered by role)
export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        let orders;

        // Admin can see all orders
        if (user.role === 'admin') {
            orders = await Order.find({})
                .populate('userId', 'name email role')
                .sort({ createdAt: -1 });
        } else {
            // Users and businesses can only see their own orders
            orders = await Order.find({ userId: user.userId })
                .sort({ createdAt: -1 });
        }

        return NextResponse.json(
            {
                success: true,
                count: orders.length,
                orders,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Get orders error:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching orders' },
            { status: 500 }
        );
    }
}

// POST create new order
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const { items, totalAmount, shippingAddress, paymentMethod } = body;

        // Validation
        if (!items || !items.length || !totalAmount || !shippingAddress || !paymentMethod) {
            return NextResponse.json(
                { success: false, message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Generate unique order ID
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const order = await Order.create({
            orderId,
            userId: user.userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            status: 'pending',
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Order created successfully',
                order,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Create order error:', error);
        return NextResponse.json(
            { success: false, message: 'Error creating order' },
            { status: 500 }
        );
    }
}
