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

// GET all users (Admin only)
export async function GET(request: NextRequest) {
    try {
        const admin = verifyAdmin(request);
        if (!admin) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized - Admin access required' },
                { status: 401 }
            );
        }

        await dbConnect();

        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                count: users.length,
                users,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Get users error:', error);
        return NextResponse.json(
            { success: false, message: 'Error fetching users' },
            { status: 500 }
        );
    }
}
