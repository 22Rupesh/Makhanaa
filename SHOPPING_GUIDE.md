# Makhana Shopping Platform - Complete User Guide

## Getting Started

### Step 1: Start at Homepage
```
URL: http://localhost:3000
```
- See dual-gateway with two options:
  - **Left**: "Shop for Myself" (D2C Consumer Portal)
  - **Right**: "Source for Business" (B2B Wholesale Portal)

### Step 2: Access Consumer Portal
Click on either:
- The "Shop for Myself" button/card
- Or if already in consumer portal, use the "Back to Home" button to return

---

## Shopping Experience

### Browse Products
1. **Shop Page** shows 6 Makhana products:
   - Himalayan Salt Makhana ($12.99)
   - Peri-Peri Spice Blend ($14.99)
   - Caramel Honey Crunch ($13.99)
   - Raw Organic Makhana ($9.99)
   - BBQ Smokehouse ($14.99)
   - Lightly Salted ($10.99)

2. **Filter by Category**:
   - All Products
   - Raw
   - Flavored

3. **View Ratings & Reviews**:
   - 5-star rating display
   - Number of reviews shown

### Add Items - Option A (Quick Add)

**From Shop Page:**
```
1. Find product you like
2. Click "Add to Cart" button (Gold colored)
3. Button turns GREEN + shows checkmark
4. Displays "Added!" message
5. Automatically dismisses after 2 seconds
6. Cart icon updates with item count
```

**Visual Feedback:**
- Button color: Gold (#D4A574) → Green (#22c55e)
- Icon: ShoppingBag → Check
- Text: "Add to Cart" → "Added!"

### Add Items - Option B (View Details)

**From Product Detail Page:**
```
1. Click "View Details" button
2. See full product information:
   - Full description
   - Nutrition facts
   - Ingredients list
   - Size & servings
   - Ratings & reviews
3. Adjust quantity with +/- buttons
4. See price update: $X.XX × Qty
5. Option to Subscribe & Save 15%
6. Check delivery availability (ZIP code)
7. Click "Add to Cart" button
8. See green confirmation
```

**Subscription Feature:**
- Choose between One-time Purchase or Subscribe & Save
- If subscription selected, choose frequency:
  - Every 2 weeks
  - Every 4 weeks
  - Every 8 weeks

**Delivery Calculator:**
- Enter ZIP code
- Click "Check" button
- See estimated delivery date

### Wishlist Feature

**On any product card or detail page:**
```
Click heart icon to add/remove from wishlist
- Outline heart: Not in wishlist
- Filled RED heart: Added to wishlist
```

---

## Shopping Cart Management

### Access Your Cart

**From Navigation Bar:**
```
1. Look for shopping bag icon (top right of header)
2. See badge with item count (if cart not empty)
3. Click icon to go to cart page
```

**Cart Icon Behavior:**
- Shows item count as a gold badge
- Badge only displays when cart has items
- Works on mobile and desktop

### View Cart Contents

**Cart Page Shows:**
```
Left Side - Your Items:
├─ Product image (emoji)
├─ Product name
├─ Price per unit
├─ Quantity controls (+/- buttons)
├─ Subtotal for that item
└─ Remove button (trash icon)

Right Side - Order Summary:
├─ Subtotal: Sum of all items
├─ Shipping: $5.00
├─ Tax: 10% of subtotal
├─ Total: All above combined
├─ "Proceed to Checkout" button
├─ "Continue Shopping" link
└─ "Clear Cart" button
```

### Adjust Quantities

**In Cart Page:**
```
1. Find the item you want to adjust
2. Click + button to increase quantity
3. Click - button to decrease quantity
4. Minimum quantity: 1
5. Prices update automatically
6. Order summary recalculates in real-time
```

### Remove Items

**Individual Item Removal:**
```
1. Find item in cart
2. Click "Remove" button (trash icon)
3. Item removed instantly
4. Cart total updates
5. If last item, see empty cart message
```

**Clear Entire Cart:**
```
1. Click "Clear Cart" button (bottom of summary)
2. All items removed at once
3. Return to empty cart view
4. Option to continue shopping
```

---

## Checkout Process

### Step 1: Review Order

**Before Proceeding:**
```
1. Review all items and quantities
2. Check subtotal, shipping, and tax
3. Click "Proceed to Checkout" button
4. Page switches to checkout view
```

### Step 2: Enter Shipping Address

**Required Information:**
```
Form Fields (all required):
├─ Full Name: Your complete name
├─ Email: Contact email address
├─ Address: Street address
├─ City: City name
├─ State: State abbreviation
└─ ZIP: ZIP code

Note: Form validates required fields
```

### Step 3: Select Payment Method

**Payment Options:**
```
Dropdown selector with options:
├─ Credit Card (default)
├─ Debit Card
├─ PayPal
└─ Apple Pay

Currently: Mock selection (demo only)
Backend: Ready for payment gateway integration
```

### Step 4: Complete Order

**Action Buttons:**
```
On Checkout Page:
├─ "Cancel" - Returns to cart
└─ "Place Order" - Completes purchase
  ├─ Shows success message
  ├─ Clears cart
  ├─ Resets form
  └─ Stays on checkout (ready for next order)
```

---

## Navigation

### Desktop Navigation Bar

```
┌─────────────────────────────────────────┐
│ Makhana 🌾  │  Shop  Quiz  Recipes  🛒 │
└─────────────────────────────────────────┘
                                    └─ Cart icon with count
```

**Menu Links:**
- **Makhana 🌾**: Logo - goes to shop
- **Shop**: Browse all products
- **Take Quiz**: Personality quiz for recommendations
- **Recipes**: Recipe suggestions
- **🛒 (Cart Icon)**: View your shopping cart

### Mobile Navigation

**Hamburger Menu Available:**
```
When screen < 768px width:

☰ (Menu Button appears)
  ├─ Shop
  ├─ Take Quiz
  ├─ Recipes
  └─ Cart (5) [if items in cart]
```

### Quick Navigation

**From Any Page:**
```
Home Button (top of page) → Returns to Shop

Back to Home Button (top right) → Returns to dual-gateway
                                 → Can choose D2C or B2B

Footer Links:
├─ About Makhana
├─ Products & Quiz
├─ Recipes
└─ Wholesale Portal
```

---

## Quick Reference - Button Guide

### Shop Page Buttons

| Button | Color | Action |
|--------|-------|--------|
| "Add to Cart" | Gold | Adds 1x product to cart |
| "Add to Cart" (after click) | Green | Confirmation (2 sec) |
| "View Details" | Dark Green | Goes to product page |
| Heart icon | Gold/Red | Adds/removes from wishlist |
| Filter buttons | Green/White | Filters products by category |

### Product Detail Buttons

| Button | Color | Action |
|--------|-------|--------|
| "Check" (ZIP code) | Dark Green | Calculates delivery date |
| "-" (quantity) | Gray | Decreases quantity by 1 |
| "+" (quantity) | Gray | Increases quantity by 1 |
| "Add to Cart" | Dark Green | Adds selected qty to cart |
| "Add to Cart" (after) | Green | Confirmation |

### Cart Page Buttons

| Button | Color | Action |
|--------|-------|--------|
| "-" (quantity) | Gray | Decreases item qty |
| "+" (quantity) | Gray | Increases item qty |
| "Remove" | Red | Deletes item from cart |
| "Proceed to Checkout" | Dark Green | Goes to checkout |
| "Continue Shopping" | White/Border | Returns to shop |
| "Clear Cart" | Red text | Removes all items |

### Checkout Buttons

| Button | Color | Action |
|--------|-------|--------|
| "Cancel" | White/Border | Returns to cart |
| "Place Order" | Dark Green | Completes order |

---

## Cart Item Count Badge

### Badge Display

```
Cart Icon: 🛒

With Items:    Without Items:
🛒            🛒
 ⓞ             (no badge)
 5             

Badge Content:
└─ Background: Gold (#D4A574)
└─ Text: White
└─ Number: Count of items
└─ Updates automatically
```

---

## Tips & Tricks

### Best Shopping Practices

1. **Compare Products**
   - Use filters to narrow down
   - Check ratings and reviews
   - Read full ingredients

2. **Maximize Savings**
   - Subscribe & Save 15%
   - Choose 4-week frequency for best value
   - Free shipping on orders

3. **Check Delivery**
   - Always enter ZIP code before checkout
   - Delivery dates are estimated (3-6 days)
   - Free $5 shipping included

4. **Wishlist**
   - Save favorites by clicking heart
   - Return later to purchase
   - Compare nutrition with other products

### Mobile Tips

1. **Menu Access**
   - Tap hamburger icon (☰) to see menu
   - Menu appears below navigation
   - Tap again to close

2. **Cart Viewing**
   - Swipe to adjust quantities
   - Tap Remove button to delete
   - Scroll right to see order summary

3. **Responsive Design**
   - All buttons sized for thumb taps
   - Forms fully readable on mobile
   - Checkout optimized for small screens

---

## Troubleshooting

### Item Won't Add to Cart
- Make sure you've selected a valid quantity
- Check if JavaScript is enabled
- Try refreshing the page

### Cart Showing Wrong Total
- Refresh the page to recalculate
- Check quantity values
- Verify shipping address is filled

### Can't Proceed to Checkout
- Ensure cart has at least 1 item
- Fill in all shipping address fields
- Select a payment method

### Visual Issues
- Try zooming out (Ctrl + Minus / Cmd + Minus)
- Clear browser cache
- Try different browser

---

## Demo Data

### Sample Products in Cart

To test functionality, you can add these products:

1. **Raw Organic Makhana** - $9.99 (best value)
2. **Himalayan Salt Makhana** - $12.99 (popular)
3. **Peri-Peri Spice Blend** - $14.99 (spicy lovers)

**Sample Cart Total:**
```
Subtotal:  $29.97
Shipping:  $5.00
Tax (10%): $3.50
─────────────────
Total:     $38.47
```

---

## Backend Integration Ready

The shopping cart is fully functional on the frontend and ready to connect to a backend:

### Features Ready for Integration:
- ✅ Add/remove items
- ✅ Quantity management
- ✅ Cart persistence
- ✅ Checkout form validation
- ✅ Order data collection
- ✅ Payment method selection

### Next Steps:
1. Create API endpoint for `/api/cart/add`
2. Create API endpoint for `/api/orders/create`
3. Connect to payment processor (Stripe, PayPal, etc.)
4. Replace mock alerts with real API calls
5. Add order confirmation emails

---

**Happy Shopping! 🛒🌾**

For questions or technical support, refer to IMPROVEMENTS.md for developer documentation.
