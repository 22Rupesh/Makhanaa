import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, password, role, businessName, businessType } = body;

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide all required fields' },
                { status: 400 }
            );
        }

        // Validate business fields if role is business
        if (role === 'business' && (!businessName || !businessType)) {
            return NextResponse.json(
                { success: false, message: 'Business name and type are required for business accounts' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const userData: any = {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || 'user',
        };

        // Add business fields if role is business
        if (role === 'business') {
            userData.businessName = businessName;
            userData.businessType = businessType;
        }

        const user = await User.create(userData);

        return NextResponse.json(
            {
                success: true,
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error during registration' },
            { status: 500 }
        );
    }
}
