import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            products,
            totalQuantity,
            pricingTier,
            packagingType,
            companyName,
            buyerEmail,
            country
        } = body;

        // Validate required fields
        if (!products || products.length === 0 || !companyName || !buyerEmail || !country) {
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
        const productDetailsHTML = products.map((product: any, index: number) => `
      <tr>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${index + 1}</td>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${product.name}</td>
        <td style="padding: 12px; border: 1px solid #e5e7eb;">${product.quantity} kg</td>
      </tr>
    `).join('');

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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
            color: #667eea;
            margin-top: 0;
            font-size: 18px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          th {
            background: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
            border: 1px solid #667eea;
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
            color: #667eea;
          }
          .highlight {
            background: #fef3c7;
            padding: 15px;
            border-left: 4px solid #f59e0b;
            margin: 15px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🌾 New Bulk Quote Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Makhana India-to-USA Platform</p>
          </div>
          
          <div class="content">
            <!-- Company Information -->
            <div class="section">
              <h2>📋 Company Information</h2>
              <div class="info-row">
                <span class="info-label">Company Name:</span>
                <span>${companyName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Buyer Email:</span>
                <span>${buyerEmail}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Country:</span>
                <span>${country}</span>
              </div>
            </div>

            <!-- Product Details -->
            <div class="section">
              <h2>📦 Product Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${productDetailsHTML}
                </tbody>
              </table>
            </div>

            <!-- Pricing Information -->
            <div class="section">
              <h2>💰 Pricing Information</h2>
              <div class="info-row">
                <span class="info-label">Total Quantity:</span>
                <span><strong>${totalQuantity} kg</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Pricing Tier:</span>
                <span>${pricingTier}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Price per kg:</span>
                <span><strong>$${body.pricePerKg || 'TBD'}</strong></span>
              </div>
              <div class="highlight">
                <strong>Estimated Total:</strong> $${body.estimatedTotal || 'TBD'}
              </div>
            </div>

            <!-- Packaging Preference -->
            <div class="section">
              <h2>📦 Packaging Preference</h2>
              <div class="info-row">
                <span class="info-label">Packaging Type:</span>
                <span>${packagingType}</span>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280;">
              <p style="margin: 5px 0;">This is an automated quote request from the Makhana Platform</p>
              <p style="margin: 5px 0;">Please respond to the buyer at: <a href="mailto:${buyerEmail}">${buyerEmail}</a></p>
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
            subject: `New Bulk Quote Request from ${companyName}`,
            html: emailHTML,
        });

        return NextResponse.json(
            { success: true, message: 'Quote request sent successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send quote request' },
            { status: 500 }
        );
    }
}
