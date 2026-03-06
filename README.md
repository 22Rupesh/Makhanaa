# Makhana India - Premium Superfood Snack & Wholesale Platform

A fully functional e-commerce platform with dual portals for D2C consumers and B2B wholesale partners. Built with Next.js, React, and Tailwind CSS.

## 🌾 Features

### Homepage (Dual Gateway)
- **Split-screen design** routing users to D2C or B2B portals
- **Responsive layout** that stacks on mobile
- Trust badges showcasing FDA, ISO, and fair-trade certifications

### 🛍️ D2C Consumer Portal

#### Product Shop (`/consumer`)
- **Product Grid** with 6 flavored varieties + raw organic
- **Category Filtering** (All, Raw, Flavored)
- **Favorite/Wishlist** functionality (heart toggle)
- **Star Ratings & Reviews** for each product
- **Nutrition Comparison Table** (Makhana vs. Popcorn)

#### Product Detail Page (`/consumer/product/:id`)
- **Detailed Product Info** with nutrition facts and ingredients
- **Image Gallery** with emoji representations
- **Subscription Toggle** - One-time purchase vs. Subscribe & Save 15%
- **Delivery ETA Calculator** - Enter ZIP code for estimated delivery
- **Quantity Selector** with + and - buttons
- **Add to Cart** functionality with dynamic pricing
- **Related Products** carousel
- Trust indicators (Organic, FDA Certified, Free Shipping)

#### Snack Personality Quiz (`/consumer/quiz`)
- **3-Question Interactive Quiz**:
  1. When do you snack? (Morning/Afternoon/Evening/Late Night)
  2. Flavor preference? (Spicy/Sweet/Savory/Plain)
  3. Snacking style? (Mindful/Binge/On-the-go/Social)
- **Smart Recommendation Engine** - Matches quiz answers to products
- **Progress Bar** showing quiz completion
- **Results Page** with recommended product and exploration options
- **Retake Quiz** button to start over

#### Recipe Hub (`/consumer/recipes`)
- **6 Complete Recipes** with full instructions:
  - Spiced Makhana Mix (Party Snack)
  - Makhana Kheer (Traditional Dessert)
  - Makhana Energy Bars (Protein-packed)
  - Makhana Chia Pudding (Breakfast)
  - Makhana Curry (Main Dish)
  - Makhana Popcorn (Movie Night)
- **Recipe Cards** with prep time, servings, difficulty
- **Ingredient Lists** with quick-view tag display
- **Helpful Tips Section** for storage and cooking
- **Shop Now CTA** to purchase ingredients

### 🏢 B2B Wholesale Portal

#### Business Homepage (`/business`)
- **3 Main Feature Cards**:
  1. Compliance Vault
  2. Bulk Pricing Calculator
  3. Sample Kit Order
- **Product Lines** overview (Raw vs. Pre-Flavored)
- **Quick Stats** showing bulk pricing and order info
- **FAQ Section** with common B2B questions
- **Trust indicators** for compliance and certifications

#### Compliance Vault (`/business/compliance`)
- **Document Library** with 8+ compliance documents:
  - FDA Registration
  - HACCP Certification
  - ISO 22000 Certificate
  - Lab Reports (Heavy Metals, Pesticide Residue, Microbial)
  - Organic Certification
  - Fair Trade Certification
- **Advanced Search & Filter** by document name or batch number
- **Searchable by Document Type**
- **Download PDFs** with download status indicator
- **Document Metadata** (Issue/Expiry dates, Batch #)
- **Status Badges** (Valid/Latest)
- **Recent Updates Timeline**

#### Bulk Pricing Calculator (`/business/pricing`)
- **Interactive Quantity Slider** (50kg - 10,000kg)
- **Product Type Selection** (Raw vs. Pre-Flavored)
- **Dynamic Pricing Tiers**:
  - Starter (50-200kg): $14.50/kg
  - Growth (201-500kg): $13.20/kg
  - Scaling (501-1000kg): $12.50/kg
  - Enterprise (1001-5000kg): $11.80/kg
  - Wholesale (5001-10000kg): $10.80/kg
- **Real-time Calculation**:
  - Subtotal (quantity × price/kg)
  - Shipping estimate (varies by quantity)
  - Total cost
- **Packaging Options** (100kg, 50kg, 25kg, 5kg bags)
- **Request Official Quote** form with validation
- **Download Invoice** button
- **Tier Information** cards showing pricing structure

#### Sample Kit Order (`/business/sample-kit`)
- **2-Step Order Form**:
  1. Company Information (name, contact, business type)
  2. Review & Order confirmation
- **Form Validation** with required field checks
- **Sample Kit Details** ($50 refundable)
- **Refund Guarantee** clearly displayed
- **What's Included** section (5 product samples + certifications)
- **Order Confirmation Page** with next steps timeline
- **FAQ Section** for common questions

#### Order Tracking Dashboard (`/business/orders`)
- **Mock Order Data** with 4 sample orders
- **Order Summary Cards** showing status, quantity, total
- **Expandable Order Details**:
  - Delivery timeline with 5 stages
  - Stage completion indicators
  - Dates for each stage
  - Order information grid
  - Delivery information with tracking
- **Order Actions** (Download Invoice, Request Replacement)
- **Status Badges** (Delivered, Shipped, In Production)
- **Summary Statistics** (Total orders, Delivered, In Transit, Processing)

### 🧭 Navigation & Layout

#### Consumer Layout (`/consumer/layout.tsx`)
- Sticky navigation with logo and menu
- Shopping cart icon with item count
- Mobile hamburger menu
- Footer with links and company info

#### Business Layout (`/business/layout.tsx`)
- Professional B2B navigation
- Mobile responsive menu
- Dedicated business footer

#### Root Layout
- Google Fonts (Geist)
- Global styles and design tokens
- Vercel Analytics integration

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2D5F3F` - Trust, nature, freshness
- **Accent Gold**: `#D4A574` - Premium, luxury
- **Background Cream**: `#FAF8F5` - Organic feel
- **Text Charcoal**: `#2C2C2C` - High readability
- **Supporting Neutrals**: Grays for hierarchy

### Typography
- **Headings**: Playfair Display (serif) - Premium quality
- **Body**: System fonts (sans-serif) - Legibility
- **Font Weights**: Bold (700) for emphasis, Regular (400) for body

### Component Styles
- **Buttons**: 8px radius, hover states with shadow
- **Cards**: 12px radius, soft shadows, hover lift effect
- **Forms**: Clean inputs with focus states
- **Tables**: Alternating row colors for readability

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Project Structure

```
/app
├── page.tsx                    # Homepage (dual gateway)
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles & design tokens
├── consumer/
│   ├── layout.tsx             # Consumer navigation
│   ├── page.tsx               # Product shop
│   ├── quiz/
│   │   └── page.tsx           # Personality quiz
│   ├── recipes/
│   │   └── page.tsx           # Recipe hub
│   └── product/
│       └── [id]/
│           └── page.tsx       # Product detail page
└── business/
    ├── layout.tsx             # B2B navigation
    ├── page.tsx               # B2B homepage
    ├── compliance/
    │   └── page.tsx           # Compliance vault
    ├── pricing/
    │   └── page.tsx           # Pricing calculator
    ├── sample-kit/
    │   └── page.tsx           # Sample kit order
    └── orders/
        └── page.tsx           # Order tracking

/lib
├── cart-context.tsx           # Cart state management
└── utils.ts                   # Utility functions

/components
├── ui/                        # shadcn UI components
└── [component files]
```

## ✨ Key Features Implemented

### Fully Functional Features
✅ Dynamic product listing with filtering
✅ Interactive product detail pages with all options
✅ Smart quiz engine with personalized recommendations
✅ Recipe hub with 6 complete recipes
✅ Bulk pricing calculator with tiered pricing
✅ Compliance document search and download
✅ Sample kit ordering with 2-step form
✅ Order tracking with timeline visualization
✅ Responsive design (mobile, tablet, desktop)
✅ Form validation and error handling
✅ Interactive buttons and navigation
✅ State management with React hooks
✅ Dynamic calculations (delivery ETA, pricing, etc.)

### UI/UX Highlights
- Smooth transitions and hover effects
- Loading states and confirmations
- Progress indicators (quiz, order form)
- Visual hierarchy with clear CTAs
- Accessibility-friendly color contrasts
- Mobile-first responsive design

## 🔧 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Hooks + Context API
- **Forms**: React Hook Form (with Zod for validation)

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: Single column, stacked navigation, touch-friendly buttons
- **Tablet**: 2-3 column layouts, optimized spacing
- **Desktop**: Full 3-4 column grids, sidebars, advanced layouts

## 🎯 Next Steps (Optional Enhancements)

1. **Backend Integration**:
   - Connect to real product database
   - Implement payment processing (Stripe)
   - Setup order management system

2. **Authentication**:
   - User accounts and login
   - Saved favorites/wishlists
   - Order history

3. **Additional Features**:
   - Video demonstrations (facility tours)
   - Live chat support
   - Email notifications
   - Advanced analytics

4. **Performance**:
   - Image optimization
   - Lazy loading
   - Caching strategies

## 📄 License

This is a demo project created with v0.app.

---

**Built with ❤️ for the Makhana India brand**
