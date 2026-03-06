import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BusinessOrder from '@/models/BusinessOrder';

// GET single business order by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const order = await BusinessOrder.findById(id);

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, order },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PATCH update order status
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { success: false, message: 'Status is required' },
                { status: 400 }
            );
        }

        const order = await BusinessOrder.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, order },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update order' },
            { status: 500 }
        );
    }
}

// DELETE business order
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const order = await BusinessOrder.findByIdAndDelete(id);

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Order deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
