import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BusinessOrder from '@/models/BusinessOrder';

// GET business orders for logged-in user or all orders for admin
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userEmail = searchParams.get('email');

        await dbConnect();

        let orders;
        if (userEmail) {
            // Fetch orders for specific user
            orders = await BusinessOrder.find({ userEmail }).sort({ createdAt: -1 });
        } else {
            // Fetch all orders (for admin)
            orders = await BusinessOrder.find({}).sort({ createdAt: -1 });
        }

        // Calculate statistics
        const totalOrders = orders.length;
        const totalSpent = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

        return NextResponse.json(
            {
                success: true,
                orders,
                stats: {
                    totalOrders,
                    totalSpent,
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching business orders:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

// POST create new business order
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const {
            orderType,
            userEmail,
            companyName,
            contactName,
            phone,
            country,
            businessType,
            products,
            totalQuantity,
            totalAmount,
            notes,
        } = body;

        // Validate required fields
        if (!orderType || !userEmail || !companyName) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const order = await BusinessOrder.create({
            orderType,
            userEmail,
            companyName,
            contactName,
            phone,
            country,
            businessType,
            products,
            totalQuantity,
            totalAmount,
            notes,
            status: 'pending',
        });

        return NextResponse.json(
            { success: true, order },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating business order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create order' },
            { status: 500 }
        );
    }
}
