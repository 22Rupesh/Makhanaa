# Makhana Platform - Quick Start Guide

## 🚀 Launch the App

```bash
npm run dev
```

Then open: **http://localhost:3000**

---

## 🗺️ Navigation Guide

### Starting Point: Homepage `/`
Click one of two buttons:

**🛍️ Left Side: "Shop for Myself"** → Consumer Portal
**🏢 Right Side: "Source for Business"** → B2B Portal

---

## 👥 USER JOURNEY: Consumer

### 1️⃣ Browse Products `/consumer`
- See 6 products with ratings and prices
- Filter by: All, Raw, or Flavored
- Click heart ❤️ to add to favorites
- **Click "View Details"** to see product page

### 2️⃣ Product Details `/consumer/product/:id`
- See full product information
- Enter ZIP code → Click "Check" → See delivery date ✅
- Toggle: One-time or Subscribe & Save 15%
- Click +/- to change quantity
- **Click "Add to Cart"** to order
- See related products below

### 3️⃣ Take Quiz `/consumer/quiz`
- Answer 3 questions about your snacking habits
- See progress bar
- Get personalized product recommendation
- Click "View Product" to see it
- Click "Retake Quiz" to try again

### 4️⃣ Explore Recipes `/consumer/recipes`
- Browse 6 complete recipes
- See prep time, servings, difficulty
- Read full ingredients and instructions
- Click "Shop Now" to buy ingredients

---

## 💼 USER JOURNEY: Business

### 1️⃣ B2B Homepage `/business`
- Learn about compliance and wholesale
- See 3 main features:
  - **Compliance Vault** → View documents
  - **Bulk Pricing** → Calculate prices
  - **Sample Kit** → Order sample

### 2️⃣ Compliance Vault `/business/compliance`
- Search documents by name or batch #
- Filter by type (FDA, ISO, Lab Reports, etc.)
- **Download** PDFs by clicking button
- See document status (Valid/Latest)
- Check recent updates

### 3️⃣ Pricing Calculator `/business/pricing`
- **Drag slider** to select quantity (50kg - 10,000kg)
- See pricing tier (Starter, Growth, Scaling, Enterprise, Wholesale)
- View real-time price calculation
- Choose packaging size
- **Download Invoice** or **Request Quote**
- Enter company email for official quote

### 4️⃣ Order Sample Kit `/business/sample-kit`
- **Step 1**: Enter company information
  - Company name (required)
  - Email (required)
  - Business type (required)
  - Agree to terms ✓
  - Click "Continue to Review"
- **Step 2**: Review order
  - Verify all details
  - See refund guarantee
  - Click "Place Order"
- **Confirmation**: See success message with next steps

### 5️⃣ Track Orders `/business/orders`
- See order summary cards
- View total orders, delivered, in transit, processing
- **Click on order** to expand details
- See 5-stage delivery timeline
- View tracking number (if shipped)
- Download invoice or request replacement

---

## 🎯 Key Interactions to Try

### On Product Page
- [ ] Enter ZIP code and click "Check" → See delivery date appear
- [ ] Toggle subscription → See frequency dropdown appear
- [ ] Click +/- buttons → See price update
- [ ] Click favorite heart → See it fill with red color

### On Quiz Page
- [ ] Answer all 3 questions → See "Next" button enable
- [ ] Click Previous → Go back to earlier questions
- [ ] Finish quiz → Get personalized recommendation

### On Compliance Page
- [ ] Type in search box → Documents filter in real-time
- [ ] Change filter dropdown → See different document types
- [ ] Click Download button → See "Downloaded!" confirmation

### On Pricing Calculator
- [ ] Drag slider → All prices update instantly
- [ ] Change product type → See price change
- [ ] Change packaging size → See carton count update
- [ ] Enter email and request quote → See confirmation

### On Sample Kit Form
- [ ] Try to click "Continue" without filling required fields → See alert
- [ ] Fill form partially → See "Continue" button disabled
- [ ] Complete all fields → See step 2
- [ ] Place order → See success confirmation

### On Orders Page
- [ ] Click order card → See timeline expand
- [ ] See different order statuses (Delivered, Shipped, In Production)
- [ ] View tracking information
- [ ] Click "Track Package" link for shipped orders

---

## 📱 Mobile Testing

Resize your browser or use DevTools to test mobile:
- Navigation becomes hamburger menu ☰
- Product grid becomes single column
- All buttons remain fully functional
- Tables may scroll horizontally on mobile

---

## 🎨 Design Notes

### Color System
- **Green #2D5F3F**: Primary actions, trust
- **Gold #D4A574**: Accents, secondary actions
- **Cream #FAF8F5**: Background
- **Charcoal #2C2C2C**: Text

### Animations
- Hover effects on buttons
- Card lift on hover
- Smooth transitions
- Progress bar fills

---

## 📊 Sample Data

### Products
- ID 1-6 for all products
- Navigate to `/consumer/product/1` through `/consumer/product/6`

### Orders (B2B)
- 4 sample orders with different statuses
- Mix of delivered, shipped, and in-production orders
- Realistic dates and tracking numbers

### Compliance Docs
- 8 different document types
- Mix of certifications and lab reports
- Batch numbers and expiry dates

---

## 🔗 Direct Links

| Page | URL |
|------|-----|
| Homepage | / |
| Consumer Shop | /consumer |
| Product #1 | /consumer/product/1 |
| Product #2 | /consumer/product/2 |
| Product #3 | /consumer/product/3 |
| Product #4 | /consumer/product/4 |
| Product #5 | /consumer/product/5 |
| Product #6 | /consumer/product/6 |
| Quiz | /consumer/quiz |
| Recipes | /consumer/recipes |
| B2B Home | /business |
| Compliance | /business/compliance |
| Pricing | /business/pricing |
| Sample Kit | /business/sample-kit |
| Orders | /business/orders |

---

## ✅ Features Checklist

### Consumer Portal
- [x] Browse products
- [x] Filter products
- [x] View product details
- [x] Calculate delivery date
- [x] Choose subscription
- [x] Adjust quantity
- [x] Add to cart
- [x] Take personality quiz
- [x] Get recommendations
- [x] View recipes
- [x] Favorite products

### B2B Portal
- [x] View compliance documents
- [x] Search documents
- [x] Filter by type
- [x] Download PDFs
- [x] Calculate bulk prices
- [x] See tiered pricing
- [x] Request quotes
- [x] Order sample kit
- [x] Track orders
- [x] View delivery timeline
- [x] Download invoices

---

## 💡 Tips

1. **On Quiz**: Your answers directly map to product recommendations. Try different combinations!

2. **On Pricing**: Move the slider across the full range (50kg to 10,000kg) to see how prices change with tier.

3. **On Compliance**: The search is real-time - it filters by both document name AND batch number. Try searching for "BATCH-2026-001".

4. **On Orders**: Click any order card to see its full timeline. Orders have different stages.

5. **On Product Details**: The delivery date calculation is realistic - it adds 3-6 days to today's date based on ZIP code area.

---

## 🆘 Troubleshooting

**Nothing appears?**
- Make sure you ran `npm run dev`
- Check that you're on http://localhost:3000
- Clear browser cache if needed

**Buttons not working?**
- All buttons should work - they have click handlers
- Check browser console for any errors
- Try refreshing the page

**Forms not validating?**
- Required fields are marked - all must be filled
- Email fields check for @ symbol
- Click the button to see validation alerts

**Mobile menu not working?**
- Click the hamburger ☰ icon in top right on mobile
- Should toggle the menu open/close

---

## 📝 Notes for Developers

- All data is mocked (no backend API)
- Forms show confirmations via `alert()` for demo purposes
- State is managed with React `useState` hooks
- Styling uses Tailwind CSS with custom design tokens
- No external API calls
- Ready for backend integration

---

**Happy exploring! 🌾**
