---
stepsCompleted: ['step-01-init']
inputDocuments: ['_bmad-output/planning-artifacts/makhana-product-brief.md', '_bmad-output/analysis/brainstorming-session-2026-01-20.md']
workflowType: 'prd'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
projectType: 'greenfield'
---

# Product Requirements Document - Makhana

**Author:** DELL  
**Date:** 2026-01-20

---

## 1. Executive Summary

### 1.1 Product Vision

Build the definitive digital bridge between Makhana producers in Bihar, India and buyers in the United States, transforming the "black box" of international food imports into a transparent, verified, and automated digital experience.

### 1.2 Core Problem Statement

**"It's not a product problem; it's a trust problem."**

US buyers (both B2B and consumers) want Makhana (Fox Nuts) but hesitate to purchase from Indian suppliers due to:
- Lack of transparency in supply chain
- Unclear compliance with US FDA/FSMA regulations
- Fear of inconsistent quality and hygiene standards
- Complex international logistics
- No professional presentation or brand authority

### 1.3 Solution Overview

A **Dual-Gateway Digital Platform** that serves two distinct audiences without confusion:

1. **D2C Consumer Portal** - Premium lifestyle brand with education, recipes, and subscription model
2. **B2B Wholesale Portal** - Compliance-focused supply chain partner with bulk pricing, sample kits, and documentation vault

**Key Innovation:** Split-screen homepage that routes users to the appropriate experience based on their needs, preventing price shock for consumers and credibility loss for B2B buyers.

### 1.4 Success Criteria

**Qualitative:**
- US buyers trust the platform as "legitimate, safe, global business" within 10 seconds
- B2B buyers can order sample kits without booking a Zoom call
- Become #1 search result for "Bulk Makhana Import USA"

**Quantitative (Year 1):**
- D2C Revenue: $500K
- B2B Revenue: $2M
- Sample Kit → Bulk Order Conversion: 30%
- Subscription Retention: 60% after 6 months
- Monthly Website Traffic: 50K by month 12

---

## 2. Target Users & Personas

### 2.1 Primary User Persona: Health-Conscious Consumer (Sarah)

**Demographics:**
- Age: 28-42
- Location: Urban US (NYC, LA, SF, Chicago, Austin)
- Income: $75K-$150K household
- Education: College degree+

**Psychographics:**
- Values: Transparency, ethical sourcing, premium quality
- Lifestyle: Active, health-conscious, yoga/fitness enthusiast
- Shopping Behavior: Reads labels, researches ingredients, willing to pay premium

**Pain Points:**
- "Is this imported snack safe and hygienic?"
- "How do I actually eat Makhana?"
- "Is this just another trendy superfood with no substance?"

**Jobs to Be Done:**
- Find healthy, protein-rich snack alternatives to popcorn/chips
- Support ethical and sustainable food systems
- Discover new, interesting foods for social sharing

**Success Metrics:**
- Time to first purchase < 3 days from discovery
- Repeat purchase rate > 40%
- Average order value: $35-$50

---

### 2.2 Primary User Persona: B2B Procurement Officer (Michael)

**Demographics:**
- Age: 35-55
- Role: Procurement Manager, Food Distributor, Restaurant Supplier
- Company Size: 50-500 employees
- Location: US (all regions)

**Psychographics:**
- Values: Compliance, reliability, scalability, risk mitigation
- Decision-Making: Data-driven, requires documentation
- Buying Cycle: 30-90 days (sample → test → bulk order)

**Pain Points:**
- "Can this supplier handle FDA compliance?"
- "What happens if there's a quality issue?"
- "Can they scale to meet our volume needs?"
- "How do I know I won't get sued for importing this?"

**Jobs to Be Done:**
- Source unique, high-margin products for portfolio
- Ensure 100% regulatory compliance
- Minimize supply chain risk
- Find reliable international partners

**Success Metrics:**
- Sample kit to bulk order conversion: 30%+
- Average order value: $15K-$40K
- Repeat order rate: 70%+
- Time from first contact to first order < 45 days

---

### 2.3 Secondary User Persona: Private Label Brand Owner (Jessica)

**Demographics:**
- Age: 30-45
- Role: Founder/CEO of emerging food brand
- Company Stage: Seed to Series A
- Location: US (coastal cities)

**Psychographics:**
- Values: Differentiation, customization, speed to market
- Goals: Build unique product line, control branding
- Challenges: Finding reliable white-label partners

**Pain Points:**
- "Can I put my logo on this?"
- "What's the minimum order quantity?"
- "How long does customization take?"

**Jobs to Be Done:**
- Source unique products that competitors don't have
- White-label products quickly and affordably
- Build brand differentiation

**Success Metrics:**
- Custom branding turnaround time < 30 days
- MOQ acceptable for emerging brands (500kg-1000kg)
- Repeat customization orders

---

## 3. User Journeys & Flows

### 3.1 D2C Consumer Journey: First-Time Purchase

**Entry Point:** Google search "healthy popcorn alternative" or Instagram ad

**Journey Steps:**

1. **Landing Page (Homepage)**
   - User sees split-screen: "Shop for Myself" vs "Source for Business"
   - **ACTION:** Clicks "Shop for Myself" button
   - **UI Element:** Large, prominent button with consumer-friendly imagery

2. **Consumer Portal Homepage**
   - 30-second silent video loop plays (drone footage of Bihar facility)
   - Hero section: "The Superfood Snack You've Never Heard Of"
   - **ACTION:** Scrolls to see "Popcorn vs. Makhana" comparison table
   - **UI Elements:** 
     - Video player (auto-play, muted, looping)
     - Comparison table (calories, protein, fat, fiber)
     - "Try It Now" CTA button

3. **Product Discovery**
   - Takes "Snack Personality Quiz"
   - **QUIZ FLOW:**
     - Question 1: "What's your go-to snack time?" (Morning/Afternoon/Evening/Late Night)
     - Question 2: "Flavor preference?" (Spicy/Sweet/Savory/Plain)
     - Question 3: "Snacking style?" (Mindful munching/Binge-watching/On-the-go)
   - **ACTION:** Submits quiz
   - **UI Elements:**
     - 3-question quiz interface
     - Progress indicator
     - "Get My Recommendation" button

4. **Personalized Recommendation**
   - System recommends starter pack based on quiz results
   - Shows: "Based on your answers, we recommend the Savory Sampler Pack"
   - **ACTION:** Clicks "Add to Cart"
   - **UI Elements:**
     - Product card with image, price, description
     - "Add to Cart" button
     - "Learn More" link to recipe hub

5. **Cart & Checkout**
   - Cart shows delivery ETA before checkout
   - Option to "Subscribe & Save 15%"
   - **ACTION:** Proceeds to checkout
   - **UI Elements:**
     - Cart summary
     - Delivery ETA calculator
     - Subscription toggle
     - "Secure Checkout" button

6. **Post-Purchase**
   - Order confirmation email with tracking
   - Receives 3 recipe cards in package
   - Follow-up email (Day 7): "How are you enjoying your Makhana?"
   - **ACTION:** Leaves review, considers subscription

**Key Functional Requirements:**
- ✅ Dual-gateway homepage with clear routing buttons
- ✅ Auto-play video with mute/unmute controls
- ✅ Interactive comparison table
- ✅ 3-question quiz with logic-based recommendations
- ✅ Real-time delivery ETA calculator
- ✅ Subscription toggle in cart
- ✅ Automated email sequences (confirmation, follow-up)

---

### 3.2 B2B Buyer Journey: Sample Kit to Bulk Order

**Entry Point:** LinkedIn post or Google search "bulk makhana import USA"

**Journey Steps:**

1. **Landing Page (Homepage)**
   - User sees split-screen: "Shop for Myself" vs "Source for Business"
   - **ACTION:** Clicks "Source for Business" button
   - **UI Element:** Professional, B2B-focused button with warehouse imagery

2. **B2B Portal Homepage**
   - Hero: "FDA-Compliant Makhana Supply Chain Partner"
   - Trust signals immediately visible:
     - "US Product Liability Insurance: $5M"
     - "FDA Registered Facility"
     - "Zero FDA Violations Since 2024"
   - **ACTION:** Scrolls to "Order Business Sample Kit"
   - **UI Elements:**
     - Trust badge section
     - "View Compliance Vault" button
     - "Order Sample Kit" CTA

3. **Compliance Vault (Optional Detour)**
   - User clicks "View Compliance Vault"
   - Sees downloadable PDFs:
     - FDA Registration Certificate
     - HACCP Certification
     - ISO 22000 Certificate
     - Lab Reports (heavy metals, pesticides) - latest batch
   - **ACTION:** Downloads 2-3 documents, returns to sample kit
   - **UI Elements:**
     - Document library with download buttons
     - Batch number filter for lab reports
     - "Last Updated" timestamps

4. **Sample Kit Order Flow**
   - Form: Company name, role, volume expectations
   - Offer: "$50 Business Sampler Box (refunded on first bulk order)"
   - **ACTION:** Completes form, pays $50
   - **UI Elements:**
     - B2B qualification form
     - Payment processor (Stripe)
     - "Order Sample Kit" button
     - Refund policy clearly stated

5. **Sample Kit Received (Offline)**
   - Receives physical sample kit with:
     - Raw Makhana (3 sizes: Small, Medium, Large)
     - Top 5 flavors
     - Printed compliance summary
     - QR code linking to digital compliance vault

6. **Bulk Pricing Calculator**
   - User returns to portal, clicks "Get Bulk Pricing"
   - Interactive calculator:
     - Input: Desired quantity (kg)
     - Output: Price per kg, total cost, shipping estimate
   - **ACTION:** Requests quote for 500kg
   - **UI Elements:**
     - Slider or input field for quantity
     - Real-time price calculation
     - "Request Quote" button
     - Tiered pricing table (50kg, 500kg, 5000kg+)

7. **Quote & Onboarding**
   - Receives automated quote email within 1 hour
   - Email includes:
     - Pricing breakdown
     - Shipping timeline
     - Payment terms
     - "5 Steps to Your First Container" checklist
   - **ACTION:** Accepts quote, places first bulk order
   - **UI Elements:**
     - Email template with clear CTAs
     - Onboarding checklist (PDF attachment)

8. **Order Tracking Dashboard**
   - User logs into B2B portal
   - Sees real-time order status:
     - Order placed → In production → Quality check → Shipped → In transit → Delivered
   - **ACTION:** Monitors shipment, receives delivery
   - **UI Elements:**
     - Order status dashboard
     - Shipment tracking integration
     - Webhook notifications for status changes

**Key Functional Requirements:**
- ✅ Separate B2B portal with professional design
- ✅ Compliance vault with downloadable PDFs
- ✅ B2B qualification form
- ✅ $50 sample kit payment flow with refund tracking
- ✅ Interactive bulk pricing calculator
- ✅ Automated quote generation system
- ✅ Order tracking dashboard with real-time status
- ✅ Webhook notifications for order updates
- ✅ Tiered pricing engine (volume-based discounts)

---

### 3.3 Private Label Brand Journey: Custom Branding

**Entry Point:** Referral from existing B2B customer or trade show

**Journey Steps:**

1. **B2B Portal → Private Label Section**
   - User navigates to "Private Label Services"
   - **ACTION:** Clicks "Start Custom Project"
   - **UI Element:** "Private Label Portal" navigation link

2. **Customization Configurator**
   - Interactive tool to specify:
     - Product type (raw, flavored, sizes)
     - Packaging type (bags, jars, bulk)
     - Branding (upload logo, choose colors)
     - Minimum order quantity
   - **ACTION:** Configures custom product
   - **UI Elements:**
     - Product selector dropdown
     - Logo upload button
     - Color picker
     - MOQ calculator
     - "Preview Mockup" button

3. **Mockup Preview**
   - System generates visual mockup of custom packaging
   - **ACTION:** Approves mockup or requests changes
   - **UI Elements:**
     - 3D mockup viewer
     - "Approve" and "Request Changes" buttons
     - Comments field

4. **Quote & Production**
   - Receives quote with production timeline
   - **ACTION:** Accepts quote, pays deposit
   - **UI Elements:**
     - Quote summary
     - Production timeline (30-45 days)
     - Deposit payment form

**Key Functional Requirements:**
- ✅ Private label configurator with logo upload
- ✅ Real-time mockup generator
- ✅ MOQ calculator for custom orders
- ✅ Production timeline estimator
- ✅ Deposit payment processing

---

## 4. Functional Requirements

### 4.1 Homepage & Navigation

#### FR-1.1: Dual-Gateway Homepage
**Priority:** P0 (Must-Have)

**Description:** Homepage must present two clear, distinct paths for D2C consumers and B2B buyers.

**Acceptance Criteria:**
- [ ] Homepage displays split-screen layout (50/50 or 60/40)
- [ ] Left side: "Shop for Myself" with consumer imagery (person snacking, yoga, lifestyle)
- [ ] Right side: "Source for Business" with B2B imagery (warehouse, containers, professional)
- [ ] Each side has prominent CTA button
- [ ] Clicking "Shop for Myself" routes to `/consumer` portal
- [ ] Clicking "Source for Business" routes to `/business` portal
- [ ] Mobile responsive: stacked vertically with "Shop for Myself" on top
- [ ] Buttons have hover states and clear visual hierarchy

**Technical Notes:**
- Use Next.js routing or React Router
- Implement A/B testing capability for button copy
- Track click-through rates for each path

---

#### FR-1.2: Video Evidence of Hygiene
**Priority:** P0 (Must-Have)

**Description:** Auto-playing silent video loop on homepage showing Bihar facility operations.

**Acceptance Criteria:**
- [ ] 30-second video loop plays automatically on page load
- [ ] Video is muted by default
- [ ] User can click to unmute
- [ ] Video shows: drone shots, automated popping machines, workers in protective gear, packaging lines
- [ ] Video has subtle overlay text: "Our Bihar Facility - Certified FDA Compliant"
- [ ] Video loads quickly (< 3 seconds) with lazy loading
- [ ] Fallback image if video fails to load
- [ ] Accessible controls (play/pause, mute/unmute)

**Technical Notes:**
- Host video on CDN (Cloudflare, AWS CloudFront)
- Use WebM format for web optimization
- Implement lazy loading for performance

---

### 4.2 Consumer (D2C) Portal Features

#### FR-2.1: Popcorn vs. Makhana Comparison Table
**Priority:** P0 (Must-Have)

**Description:** Interactive comparison table showing nutritional benefits of Makhana vs. Popcorn.

**Acceptance Criteria:**
- [ ] Table displays side-by-side comparison
- [ ] Metrics: Calories, Protein, Fat, Fiber, Carbs (per 100g)
- [ ] Makhana advantages highlighted in green
- [ ] Table is mobile-responsive (scrollable or stacked)
- [ ] Source citation for nutritional data
- [ ] "Learn More" link to detailed nutrition page

**Data:**
| Metric | Makhana (100g) | Popcorn (100g) |
|--------|----------------|----------------|
| Calories | 347 | 387 |
| Protein | 9.7g | 12g |
| Fat | 0.1g | 4.5g |
| Fiber | 14.5g | 15g |
| Carbs | 76.9g | 78g |

---

#### FR-2.2: Snack Personality Quiz
**Priority:** P1 (Should-Have)

**Description:** Interactive 3-question quiz that recommends personalized starter pack.

**Acceptance Criteria:**
- [ ] Quiz has 3 questions with 4 options each
- [ ] Progress indicator shows current question (1/3, 2/3, 3/3)
- [ ] User can navigate back to previous questions
- [ ] Quiz logic maps answers to product recommendations
- [ ] Results page shows recommended product with image, price, description
- [ ] "Add to Cart" button on results page
- [ ] Quiz results stored in session for personalization
- [ ] Option to retake quiz

**Quiz Logic:**
```
Question 1: Snack Time?
- Morning → Light flavors (Himalayan Salt, Lightly Salted)
- Afternoon → Savory (Peri Peri, BBQ)
- Evening → Spicy (Chili Lime, Masala)
- Late Night → Sweet (Caramel, Honey)

Question 2: Flavor Preference?
- Spicy → Chili Lime, Peri Peri, Masala
- Sweet → Caramel, Honey, Cinnamon
- Savory → BBQ, Truffle, Garlic Parmesan
- Plain → Lightly Salted, Himalayan Salt

Question 3: Snacking Style?
- Mindful → Small packs (50g)
- Binge-watching → Medium packs (150g)
- On-the-go → Variety pack (5x50g)
```

---

#### FR-2.3: Recipe Hub
**Priority:** P1 (Should-Have)

**Description:** Content library with recipes using Makhana.

**Acceptance Criteria:**
- [ ] Recipe hub accessible from main navigation
- [ ] Minimum 15 recipes at launch
- [ ] Categories: Salads, Curries, Smoothies, Snacks, Desserts
- [ ] Each recipe has: photo, ingredients list, instructions, prep time, difficulty
- [ ] Search functionality by ingredient or category
- [ ] "Add Ingredients to Cart" button for each recipe
- [ ] User can save favorite recipes (requires login)
- [ ] Social sharing buttons (Pinterest, Facebook, Instagram)

**Sample Recipes:**
- Makhana Trail Mix
- Makhana Curry
- Makhana Smoothie Bowl
- Makhana Salad Topper
- Caramelized Makhana Dessert

---

#### FR-2.4: Subscription & Save
**Priority:** P0 (Must-Have)

**Description:** Recurring subscription model with 15% discount.

**Acceptance Criteria:**
- [ ] Subscription toggle in cart ("Subscribe & Save 15%")
- [ ] User selects delivery frequency (every 2 weeks, 4 weeks, 8 weeks)
- [ ] First order processes immediately
- [ ] Subsequent orders auto-charge and ship based on frequency
- [ ] User can pause, skip, or cancel subscription anytime
- [ ] Subscription management dashboard in user account
- [ ] Email reminder 3 days before next shipment
- [ ] Option to modify products in subscription
- [ ] Discount automatically applied at checkout

**Technical Notes:**
- Integrate with Stripe Subscriptions or Shopify Subscriptions
- Implement webhook for subscription events (created, paused, canceled)

---

#### FR-2.5: Delivery ETA Calculator
**Priority:** P0 (Must-Have)

**Description:** Real-time delivery estimate visible before checkout.

**Acceptance Criteria:**
- [ ] User enters ZIP code on product page or cart
- [ ] System calculates delivery ETA based on:
  - User location
  - Warehouse inventory (US vs. India)
  - Shipping method (standard, express)
- [ ] ETA displayed as date range ("Arrives Jan 25-28")
- [ ] ETA updates dynamically if user changes ZIP code
- [ ] ETA visible on product page, cart, and checkout
- [ ] Fallback message if ETA cannot be calculated

**Logic:**
- If in stock at US warehouse (LA, NY, Chicago): 2-5 business days
- If shipping from India: 10-15 business days
- Express shipping: Half the standard time

---

### 4.3 B2B Portal Features

#### FR-3.1: Compliance Vault
**Priority:** P0 (Must-Have)

**Description:** Document library with downloadable compliance certificates and lab reports.

**Acceptance Criteria:**
- [ ] Compliance Vault accessible from B2B portal navigation
- [ ] Documents organized by category:
  - FDA Registration
  - HACCP Certification
  - ISO 22000 Certificate
  - Lab Reports (filterable by batch number and date)
- [ ] Each document has:
  - Document name
  - Issue date
  - Expiration date (if applicable)
  - Download button (PDF format)
  - Last updated timestamp
- [ ] Lab reports filterable by:
  - Batch number
  - Test type (heavy metals, pesticides, microbiological)
  - Date range
- [ ] Search functionality
- [ ] Documents load quickly (< 2 seconds)
- [ ] Mobile-responsive table/card layout
- [ ] Optional: Password protection for sensitive documents

**Sample Documents:**
- FDA Registration Certificate (renewed annually)
- HACCP Certification (renewed every 3 years)
- ISO 22000 Certificate (renewed every 3 years)
- Lab Report - Batch #2024-001 (Heavy Metals)
- Lab Report - Batch #2024-001 (Pesticides)
- Lab Report - Batch #2024-001 (Microbiological)

---

#### FR-3.2: Business Sample Kit Order Flow
**Priority:** P0 (Must-Have)

**Description:** Streamlined flow for B2B buyers to order $50 sample kit with refund incentive.

**Acceptance Criteria:**
- [ ] "Order Sample Kit" CTA prominently displayed on B2B homepage
- [ ] Sample kit order form collects:
  - Company name
  - Contact name
  - Email
  - Phone
  - Role/Title
  - Expected monthly volume (dropdown: <50kg, 50-500kg, 500-5000kg, 5000kg+)
  - Shipping address
- [ ] Form validation (required fields, email format, phone format)
- [ ] Payment: $50 via Stripe
- [ ] Confirmation page displays:
  - "Your sample kit will arrive in 5-7 business days"
  - "$50 will be refunded as credit on your first bulk order"
  - Tracking number (once shipped)
- [ ] Automated confirmation email with:
  - Order summary
  - Tracking link
  - Next steps: "After you receive your sample kit, use our Bulk Pricing Calculator"
- [ ] Sample kit contents:
  - Raw Makhana (Small, Medium, Large sizes - 100g each)
  - Top 5 flavors (50g each)
  - Printed compliance summary
  - QR code linking to Compliance Vault
- [ ] Admin dashboard to track sample kit orders and conversion to bulk orders

**Technical Notes:**
- Integrate Stripe for payment
- Use Shippo or EasyPost for shipping label generation
- Track sample kit → bulk order conversion rate

---

#### FR-3.3: Bulk Pricing Calculator
**Priority:** P0 (Must-Have)

**Description:** Interactive calculator showing real-time bulk pricing based on quantity.

**Acceptance Criteria:**
- [ ] Calculator accessible from B2B portal navigation
- [ ] User inputs desired quantity (kg) via slider or text input
- [ ] System calculates and displays:
  - Price per kg
  - Total cost (USD)
  - Estimated shipping cost
  - Estimated delivery timeline
- [ ] Pricing tiers:
  - Starter: 50-499kg → $X/kg
  - Growth: 500-4999kg → $Y/kg (10% discount)
  - Enterprise: 5000kg+ → $Z/kg (20% discount)
- [ ] Calculator updates in real-time as user adjusts quantity
- [ ] "Request Quote" button generates automated quote email
- [ ] Quote email includes:
  - Pricing breakdown
  - Shipping timeline
  - Payment terms (50% deposit, 50% on delivery)
  - Validity period (quote valid for 30 days)
- [ ] Calculator shows currency conversion (INR ↔ USD) with live exchange rate

**Sample Pricing:**
- Starter (50-499kg): $12/kg
- Growth (500-4999kg): $10.80/kg (10% off)
- Enterprise (5000kg+): $9.60/kg (20% off)

---

#### FR-3.4: Order Tracking Dashboard
**Priority:** P1 (Should-Have)

**Description:** Real-time order status dashboard for B2B buyers.

**Acceptance Criteria:**
- [ ] Dashboard accessible after B2B user login
- [ ] Displays all orders with status:
  - Order Placed
  - In Production
  - Quality Check
  - Shipped
  - In Transit
  - Delivered
- [ ] Each order shows:
  - Order number
  - Date placed
  - Quantity (kg)
  - Total cost
  - Current status
  - Estimated delivery date
  - Tracking number (once shipped)
- [ ] Click on order to see detailed timeline with timestamps
- [ ] Webhook notifications:
  - Email sent when status changes
  - SMS optional for critical updates (shipped, delivered)
- [ ] Export order history as CSV
- [ ] Filter orders by status, date range

**Technical Notes:**
- Integrate with shipping provider API (FedEx, DHL) for real-time tracking
- Use webhooks for status updates
- Store order history in database (PostgreSQL, MongoDB)

---

### 4.4 Private Label Portal Features

#### FR-4.1: Custom Branding Configurator
**Priority:** P2 (Nice-to-Have for MVP, P0 for Phase 2)

**Description:** Interactive tool for private label brands to customize packaging.

**Acceptance Criteria:**
- [ ] Configurator accessible from "Private Label Services" page
- [ ] User selects:
  - Product type (raw, flavored, sizes)
  - Packaging type (bags, jars, bulk containers)
  - Bag size (50g, 100g, 150g, 250g, 500g, 1kg)
- [ ] User uploads logo (PNG, SVG, min 300 DPI)
- [ ] User selects brand colors (color picker)
- [ ] User enters brand name and tagline
- [ ] System generates 3D mockup preview
- [ ] User can rotate mockup 360°
- [ ] "Approve Mockup" or "Request Changes" buttons
- [ ] If approved, system generates quote with:
  - Setup fee
  - Per-unit cost
  - Minimum order quantity (MOQ)
  - Production timeline (30-45 days)
- [ ] User can save configuration and return later

**Technical Notes:**
- Use Three.js or Spline for 3D mockup rendering
- Integrate with design tool API (Canva, Figma) for mockup generation
- Store configurations in database

---

#### FR-4.2: MOQ Calculator
**Priority:** P2 (Nice-to-Have)

**Description:** Calculator showing minimum order quantity for custom branding.

**Acceptance Criteria:**
- [ ] User inputs desired quantity
- [ ] System displays:
  - MOQ (minimum 500kg for custom branding)
  - Setup fee ($500-$1000)
  - Per-unit cost
  - Total cost
  - Production timeline
- [ ] If quantity < MOQ, show message: "Minimum order quantity for custom branding is 500kg"
- [ ] "Request Quote" button

---

### 4.5 Shared Features (Both Portals)

#### FR-5.1: User Authentication & Accounts
**Priority:** P0 (Must-Have)

**Description:** Secure user authentication for both D2C and B2B users.

**Acceptance Criteria:**
- [ ] User can register with email + password
- [ ] Email verification required
- [ ] Password requirements: min 8 characters, 1 uppercase, 1 number, 1 special character
- [ ] "Forgot Password" flow with email reset link
- [ ] Social login options (Google, Facebook) for D2C users
- [ ] B2B users have separate account type with additional fields:
  - Company name
  - Tax ID
  - Business address
- [ ] User dashboard shows:
  - Order history
  - Saved addresses
  - Payment methods
  - Subscription management (D2C)
  - Sample kit status (B2B)
- [ ] Secure session management (JWT tokens)
- [ ] Auto-logout after 30 minutes of inactivity

**Technical Notes:**
- Use Auth0, Firebase Auth, or custom JWT implementation
- Store user data securely (encrypted passwords)
- Implement RBAC (Role-Based Access Control) for D2C vs. B2B users

---

#### FR-5.2: Search Functionality
**Priority:** P1 (Should-Have)

**Description:** Global search for products, recipes, and documents.

**Acceptance Criteria:**
- [ ] Search bar in main navigation
- [ ] Search across:
  - Products (D2C portal)
  - Recipes (D2C portal)
  - Compliance documents (B2B portal)
- [ ] Auto-complete suggestions as user types
- [ ] Search results page with filters:
  - Category
  - Price range
  - Flavor
- [ ] "No results found" state with suggested alternatives
- [ ] Search analytics tracked (popular queries)

**Technical Notes:**
- Use Algolia, Elasticsearch, or PostgreSQL full-text search
- Implement search indexing for fast results

---

#### FR-5.3: Ethical Sourcing Tracker
**Priority:** P1 (Should-Have)

**Description:** Visual tracker showing impact on Mithila farming families.

**Acceptance Criteria:**
- [ ] Tracker accessible from D2C portal footer or "About" page
- [ ] Displays:
  - "Your snacks support [X] families in Mithila"
  - Map of Bihar with Mithila region highlighted
  - Farmer photos and stories
  - Impact metrics:
    - Families supported
    - Fair wages paid
    - Sustainable harvesting practices
- [ ] "Learn More" link to detailed impact report
- [ ] Social sharing buttons

**Sample Content:**
- "Your purchase supports 150 farming families in Mithila, Bihar"
- "We pay 20% above market rate for fair wages"
- "Zero child labor, sustainable harvesting"

---

#### FR-5.4: Referral Program
**Priority:** P2 (Nice-to-Have)

**Description:** "Give $10, Get $10" referral program for D2C users.

**Acceptance Criteria:**
- [ ] User can generate unique referral link from dashboard
- [ ] Referral link tracked via URL parameter or cookie
- [ ] When friend uses referral link and makes first purchase:
  - Friend gets $10 off first order
  - Referrer gets $10 credit
- [ ] Credits automatically applied to next purchase
- [ ] Referral dashboard shows:
  - Total referrals
  - Pending credits
  - Redeemed credits
- [ ] Referral program terms and conditions page

**Technical Notes:**
- Use referral tracking software (ReferralCandy, Viral Loops)
- Store referral data in database
- Implement fraud detection (same IP, same payment method)

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-1.1: Page Load Time**
- Homepage loads in < 2 seconds on 4G connection
- Product pages load in < 1.5 seconds
- Compliance Vault documents load in < 2 seconds

**NFR-1.2: API Response Time**
- Pricing calculator updates in < 500ms
- Search results return in < 300ms
- Order status updates in < 1 second

**NFR-1.3: Scalability**
- Platform handles 10,000 concurrent users
- Database supports 1M+ products and orders
- CDN for global content delivery

---

### 5.2 Security

**NFR-2.1: Data Protection**
- All data encrypted in transit (TLS 1.3)
- All data encrypted at rest (AES-256)
- PCI DSS compliant payment processing
- GDPR and CCPA compliant data handling

**NFR-2.2: Authentication**
- Multi-factor authentication (MFA) for B2B accounts
- Session timeout after 30 minutes of inactivity
- Password hashing with bcrypt (cost factor 12)

**NFR-2.3: Compliance**
- SOC 2 Type II certification (future)
- Regular security audits
- Penetration testing annually

---

### 5.3 Availability

**NFR-3.1: Uptime**
- 99.9% uptime SLA
- Scheduled maintenance windows (max 2 hours/month)
- Automated failover for critical services

**NFR-3.2: Disaster Recovery**
- Daily database backups
- Backup retention: 30 days
- Recovery Time Objective (RTO): 4 hours
- Recovery Point Objective (RPO): 1 hour

---

### 5.4 Usability

**NFR-4.1: Accessibility**
- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader compatible
- Alt text for all images

**NFR-4.2: Browser Support**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**NFR-4.3: Mobile Responsiveness**
- Fully responsive design for all screen sizes
- Touch-friendly UI elements (min 44x44px)
- Mobile-first design approach

---

## 6. Technical Architecture

### 6.1 Technology Stack

**Frontend:**
- Framework: Next.js 14 (React 18)
- Styling: Tailwind CSS
- State Management: Zustand or Redux Toolkit
- Forms: React Hook Form
- UI Components: Shadcn/ui or Radix UI

**Backend:**
- Framework: Node.js + Express or Django + Django REST Framework
- Database: PostgreSQL (primary), Redis (caching)
- ORM: Prisma (Node.js) or Django ORM
- API: RESTful API + GraphQL (optional)

**Infrastructure:**
- Hosting: Vercel (frontend), AWS EC2/ECS (backend)
- CDN: Cloudflare
- Storage: AWS S3 (documents, images, videos)
- Email: SendGrid or AWS SES
- SMS: Twilio

**Integrations:**
- Payment: Stripe
- Shipping: Shippo or EasyPost
- Analytics: Google Analytics, Mixpanel
- Search: Algolia or Elasticsearch
- Auth: Auth0 or Firebase Auth

---

### 6.2 Database Schema (High-Level)

**Users Table:**
- id, email, password_hash, user_type (consumer, b2b, admin)
- company_name (B2B only), tax_id (B2B only)
- created_at, updated_at

**Products Table:**
- id, name, description, price, category, flavor, size
- inventory_us, inventory_india
- created_at, updated_at

**Orders Table:**
- id, user_id, order_type (d2c, b2b, sample_kit)
- total_amount, status, shipping_address
- created_at, updated_at

**Subscriptions Table:**
- id, user_id, product_id, frequency, status
- next_billing_date, created_at, updated_at

**Compliance_Documents Table:**
- id, document_name, document_type, file_url
- issue_date, expiration_date, batch_number
- created_at, updated_at

---

## 7. Success Metrics & KPIs

### 7.1 D2C Metrics

**Acquisition:**
- Monthly website traffic: 50K by month 12
- Conversion rate: 3-5%
- Customer acquisition cost (CAC): < $30

**Engagement:**
- Average session duration: > 3 minutes
- Pages per session: > 4
- Quiz completion rate: > 60%

**Retention:**
- Repeat purchase rate: > 40%
- Subscription retention: > 60% after 6 months
- Customer lifetime value (LTV): > $150

**Revenue:**
- Average order value (AOV): $35-$50
- Monthly recurring revenue (MRR): $50K by month 12
- D2C revenue: $500K year 1

---

### 7.2 B2B Metrics

**Acquisition:**
- Sample kit orders: 100/month by month 6
- Sample kit → bulk order conversion: 30%
- Average time to first bulk order: < 45 days

**Engagement:**
- Compliance Vault downloads: > 500/month
- Bulk pricing calculator usage: > 200/month
- Average session duration: > 5 minutes

**Retention:**
- Repeat order rate: > 70%
- Average order frequency: Every 60 days
- Customer lifetime value (LTV): > $100K

**Revenue:**
- Average bulk order value: $15K-$40K
- B2B revenue: $2M year 1
- Private label revenue: $500K year 2

---

### 7.3 Platform Health Metrics

**Performance:**
- Page load time: < 2 seconds
- API response time: < 500ms
- Uptime: 99.9%

**Quality:**
- Bug rate: < 1% of releases
- Customer support tickets: < 5% of orders
- Net Promoter Score (NPS): > 50

---

## 8. Risks & Mitigation

### 8.1 Technical Risks

**Risk:** Platform scalability issues during traffic spikes
**Impact:** High
**Mitigation:**
- Implement auto-scaling on AWS
- Use CDN for static assets
- Load testing before major launches

**Risk:** Payment processing failures
**Impact:** High
**Mitigation:**
- Use Stripe with 99.99% uptime SLA
- Implement retry logic for failed payments
- Fallback payment methods

---

### 8.2 Business Risks

**Risk:** FDA compliance delays
**Impact:** High
**Mitigation:**
- Hire FDA consultant early
- Buffer 6 months for approvals
- Maintain compliance calendar

**Risk:** High customer acquisition cost
**Impact:** Medium
**Mitigation:**
- Focus on SEO and content marketing
- Build organic social media presence
- Referral program for viral growth

**Risk:** Competitor copies model
**Impact:** Medium
**Mitigation:**
- Build moats: exclusive supplier contracts, brand, data
- Move fast to capture market share
- Trademark "Mithila Makhana"

---

## 9. Launch Plan & Roadmap

### 9.1 Phase 1: MVP (Months 1-3)

**Core Features:**
- ✅ Dual-gateway homepage
- ✅ D2C product catalog (3 flavors)
- ✅ B2B sample kit order flow
- ✅ Compliance Vault
- ✅ Basic checkout and payment
- ✅ User authentication

**Goals:**
- Launch beta with 50 D2C testers
- Process 10 B2B sample kit orders
- Validate product-market fit

---

### 9.2 Phase 2: Growth (Months 4-6)

**New Features:**
- ✅ Subscription & Save
- ✅ Bulk pricing calculator
- ✅ Recipe hub (15 recipes)
- ✅ Snack personality quiz
- ✅ Order tracking dashboard

**Goals:**
- Expand to 10 flavors
- Achieve $50K MRR (D2C)
- Convert 30% of sample kits to bulk orders

---

### 9.3 Phase 3: Scale (Months 7-12)

**New Features:**
- ✅ Private label configurator
- ✅ Referral program
- ✅ Ethical sourcing tracker
- ✅ Advanced analytics dashboard

**Goals:**
- Reach $500K D2C revenue
- Reach $2M B2B revenue
- Establish US warehouse network

---

## 10. Appendix

### 10.1 Glossary

- **Makhana:** Fox nuts, also known as lotus seeds
- **D2C:** Direct-to-Consumer
- **B2B:** Business-to-Business
- **FDA:** Food and Drug Administration
- **HACCP:** Hazard Analysis and Critical Control Points
- **MOQ:** Minimum Order Quantity
- **CAC:** Customer Acquisition Cost
- **LTV:** Lifetime Value
- **MRR:** Monthly Recurring Revenue

### 10.2 Related Documents

- Product Brief: `_bmad-output/planning-artifacts/makhana-product-brief.md`
- Brainstorming Session: `_bmad-output/analysis/brainstorming-session-2026-01-20.md`
- Master Concept Document: (provided by user)

### 10.3 Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-20 | DELL | Initial PRD creation from product brief |

---

**Document Status:** Draft v1.0  
**Next Review:** 2026-02-01  
**Approval Required:** Stakeholders, Engineering Lead, Design Lead
