import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            companyName,
            contactName,
            email,
            phone,
            country,
            businessType,
            expectedVolume,
            products
        } = body;

        // Validate required fields
        if (!companyName || !email || !businessType) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Build product details HTML
        const productDetailsHTML = products && products.length > 0 ? products.map((product: any, index: number) => `
      <tr>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${index + 1}</td>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${product.name}</td>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${product.weight || '300g'}</td>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${product.flavor || product.description || 'Premium quality'}</td>
      </tr>
    `).join('') : '<tr><td colspan="4" style="padding: 12px; text-align: center;">No products selected</td></tr>';

        // Email HTML template
        const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #2D5F3F 0%, #1f4428 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .section {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .section h2 {
            color: #2D5F3F;
            margin-top: 0;
            font-size: 18px;
            border-bottom: 2px solid #2D5F3F;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          th {
            background: #2D5F3F;
            color: white;
            padding: 12px;
            text-align: left;
            border: 1px solid #2D5F3F;
          }
          td {
            padding: 12px;
            border: 1px solid #e5e7eb;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-label {
            font-weight: bold;
            color: #2D5F3F;
          }
          .highlight {
            background: #A8D5BA;
            padding: 15px;
            border-left: 4px solid #2D5F3F;
            margin: 15px 0;
            border-radius: 4px;
          }
          .badge {
            background: #D4A574;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">📦 New Sample Kit Order</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Makhana India-to-USA Platform</p>
            <div class="badge">$50.00 Sample Kit</div>
          </div>
          
          <div class="content">
            <!-- Company Information -->
            <div class="section">
              <h2>🏢 Company Information</h2>
              <div class="info-row">
                <span class="info-label">Company Name:</span>
                <span>${companyName}</span>
              </div>
              ${contactName ? `
              <div class="info-row">
                <span class="info-label">Contact Name:</span>
                <span>${contactName}</span>
              </div>
              ` : ''}
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span>${email}</span>
              </div>
              ${phone ? `
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span>${phone}</span>
              </div>
              ` : ''}
              ${country ? `
              <div class="info-row">
                <span class="info-label">Country:</span>
                <span>${country}</span>
              </div>
              ` : ''}
              <div class="info-row">
                <span class="info-label">Business Type:</span>
                <span>${businessType}</span>
              </div>
              ${expectedVolume ? `
              <div class="info-row">
                <span class="info-label">Expected Monthly Volume:</span>
                <span>${expectedVolume}</span>
              </div>
              ` : ''}
            </div>

            <!-- Sample Kit Products -->
            <div class="section">
              <h2>📦 Sample Kit Contents</h2>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${productDetailsHTML}
                </tbody>
              </table>
            </div>

            <!-- Additional Items -->
            <div class="section">
              <h2>📋 Additional Items Included</h2>
              <div style="padding: 10px 0;">
                <div style="padding: 8px 0;">
                  <strong>✓ Quality Certifications</strong>
                  <p style="margin: 5px 0 0 20px; color: #666; font-size: 14px;">Digital • FDA, ISO, HACCP</p>
                </div>
                <div style="padding: 8px 0;">
                  <strong>✓ Batch Lab Report</strong>
                  <p style="margin: 5px 0 0 20px; color: #666; font-size: 14px;">Digital • Heavy metals & microbial tests</p>
                </div>
              </div>
            </div>

            <!-- Order Details -->
            <div class="section">
              <h2>💰 Order Details</h2>
              <div class="info-row">
                <span class="info-label">Sample Kit Price:</span>
                <span><strong>$50.00</strong></span>
              </div>
              <div class="highlight">
                <strong>🎁 Refund Guarantee:</strong> The $50 will be refunded when the customer places a bulk order of 100kg or more within 6 months.
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280;">
              <p style="margin: 5px 0;">This is an automated sample kit order from the Makhana Platform</p>
              <p style="margin: 5px 0;">Please respond to the buyer at: <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p style="margin: 5px 0;">Phone: ${phone}</p>` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

        // Send email
        await transporter.sendMail({
            from: `"Makhana Platform" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: `🎁 New Sample Kit Order from ${companyName}`,
            html: emailHTML,
        });

        return NextResponse.json(
            { success: true, message: 'Sample kit order sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending sample kit email:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send sample kit order' },
            { status: 500 }
        );
    }
}
