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

// GET single document
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const document = await Document.findById(id);

        if (!document) {
            return NextResponse.json(
                { success: false, message: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, document },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch document' },
            { status: 500 }
        );
    }
}

// DELETE document (admin only)
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

        const document = await Document.findByIdAndDelete(id);

        if (!document) {
            return NextResponse.json(
                { success: false, message: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Document deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete document' },
            { status: 500 }
        );
    }
}
