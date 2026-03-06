import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';

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

// PUT update user role (Admin only)
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
        const { role } = body;

        if (!role || !['user', 'business', 'admin'].includes(role)) {
            return NextResponse.json(
                { success: false, message: 'Invalid role' },
                { status: 400 }
            );
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'User role updated successfully',
                user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { success: false, message: 'Error updating user' },
            { status: 500 }
        );
    }
}

// DELETE user (Admin only)
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

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'User deleted successfully',
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Delete user error:', error);
        return NextResponse.json(
            { success: false, message: 'Error deleting user' },
            { status: 500 }
        );
    }
}
