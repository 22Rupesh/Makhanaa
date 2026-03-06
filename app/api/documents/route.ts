import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Document from '@/models/Document';
import jwt from 'jsonwebtoken';

// Verify admin access
function verifyAdmin(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        if (decoded.role !== 'admin') return null;

        return decoded;
    } catch (error) {
        return null;
    }
}

// GET all documents
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const documents = await Document.find({}).sort({ uploadedAt: -1 });

        return NextResponse.json(
            { success: true, documents },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch documents' },
            { status: 500 }
        );
    }
}

// POST new document (admin only)
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
        const {
            name,
            type,
            issueDate,
            expiryDate,
            batchNumber,
            status,
            fileData,
            fileName,
            fileType
        } = body;

        // Validate required fields
        if (!name || !type || !issueDate || !fileData || !fileName || !fileType) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const document = await Document.create({
            name,
            type,
            issueDate,
            expiryDate: expiryDate || null,
            batchNumber: batchNumber || 'N/A',
            status: status || 'Valid',
            fileData,
            fileName,
            fileType,
            uploadedBy: admin.email,
        });

        return NextResponse.json(
            { success: true, document },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create document' },
            { status: 500 }
        );
    }
}
