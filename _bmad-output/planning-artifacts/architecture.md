---
stepsCompleted: ['step-01-init']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/makhana-product-brief.md']
workflowType: 'architecture'
---

# Architecture Document - Makhana Digital Platform

**Author:** DELL  
**Date:** 2026-01-20  
**Version:** 1.0

---

## 1. Executive Summary

This document defines the technical architecture for the Makhana India-to-USA Digital Platform - a dual-gateway e-commerce system serving both D2C consumers and B2B wholesalers.

**Key Architectural Principles:**
- Separation of concerns (D2C vs B2B portals)
- Scalability for 10K+ concurrent users
- Security-first design (PCI DSS, GDPR compliant)
- Performance optimization (< 2s page loads)
- API-first architecture for future mobile apps

---

## 2. System Architecture Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
├──────────────────────┬──────────────────────────────────────┤
│   D2C Web Portal     │      B2B Web Portal                  │
│   (Next.js)          │      (Next.js)                       │
└──────────────────────┴──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     CDN LAYER (Cloudflare)                   │
│   - Static Assets    - Video Content    - Images            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                          │
│   - Authentication   - Rate Limiting   - Routing             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                           │
├──────────────────────┬──────────────────────────────────────┤
│  Consumer Service    │    Business Service                  │
│  - Product Catalog   │    - Bulk Pricing                    │
│  - Quiz Engine       │    - Sample Kits                     │
│  - Subscriptions     │    - Compliance Vault                │
│  - Recipe Hub        │    - Order Tracking                  │
└──────────────────────┴──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
├──────────────────────┬──────────────────────────────────────┤
│  PostgreSQL          │    Redis Cache                       │
│  - Users/Orders      │    - Sessions                        │
│  - Products          │    - Pricing                         │
│  - Subscriptions     │    - Inventory                       │
└──────────────────────┴──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 INTEGRATION LAYER                            │
│  Stripe  │  Shippo  │  SendGrid  │  Algolia  │  AWS S3     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Technology Stack

**Framework:** Next.js 14 (App Router)
- Server-side rendering for SEO
- API routes for backend integration
- Static generation for marketing pages

**UI Framework:** React 18
- Component-based architecture
- Hooks for state management
- Server components for performance

**Styling:** Tailwind CSS
- Utility-first CSS
- Custom design system
- Responsive breakpoints

**State Management:** Zustand
- Lightweight global state
- Cart management
- User session

**Form Handling:** React Hook Form
- Validation with Zod schemas
- Error handling
- Async submission

### 3.2 Component Architecture

```
src/
├── app/
│   ├── (consumer)/          # D2C Portal Routes
│   │   ├── page.tsx         # Consumer homepage
│   │   ├── products/
│   │   ├── quiz/
│   │   ├── recipes/
│   │   └── checkout/
│   ├── (business)/          # B2B Portal Routes
│   │   ├── page.tsx         # B2B homepage
│   │   ├── compliance/
│   │   ├── sample-kit/
│   │   ├── pricing/
│   │   └── dashboard/
│   └── api/                 # API Routes
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── VideoPlayer.tsx
│   ├── consumer/            # D2C specific components
│   │   ├── QuizFlow.tsx
│   │   ├── RecipeCard.tsx
│   │   └── SubscriptionToggle.tsx
│   └── business/            # B2B specific components
│       ├── ComplianceVault.tsx
│       ├── PricingCalculator.tsx
│       └── OrderDashboard.tsx
├── lib/
│   ├── api.ts              # API client
│   ├── auth.ts             # Authentication
│   └── utils.ts            # Utilities
└── store/
    ├── cart.ts             # Cart state
    └── user.ts             # User state
```

### 3.3 Key Frontend Features Implementation

#### 3.3.1 Dual-Gateway Homepage

**Component:** `app/page.tsx`

```typescript
// Homepage with split-screen routing
export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* D2C Side */}
      <Link href="/consumer" className="gateway-card consumer">
        <VideoBackground src="/videos/lifestyle.mp4" />
        <h2>Shop for Myself</h2>
        <Button>Explore Products</Button>
      </Link>
      
      {/* B2B Side */}
      <Link href="/business" className="gateway-card business">
        <VideoBackground src="/videos/facility.mp4" />
        <h2>Source for Business</h2>
        <Button>View Wholesale</Button>
      </Link>
    </div>
  )
}
```

**Routing Logic:**
- `/` → Dual-gateway homepage
- `/consumer/*` → D2C portal (layout with consumer nav)
- `/business/*` → B2B portal (layout with B2B nav)

#### 3.3.2 Snack Personality Quiz

**Component:** `components/consumer/QuizFlow.tsx`

```typescript
interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; }[];
}

const quizLogic = {
  q1: { // Snack Time
    morning: ['himalayan-salt', 'lightly-salted'],
    afternoon: ['peri-peri', 'bbq'],
    evening: ['chili-lime', 'masala'],
    latenight: ['caramel', 'honey']
  },
  // ... more logic
};

function QuizFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const handleSubmit = () => {
    const recommendation = calculateRecommendation(answers);
    router.push(`/products/${recommendation}`);
  };
  
  return <QuizUI />;
}
```

**API Endpoint:** `POST /api/quiz/recommend`
- Input: Quiz answers
- Output: Recommended product SKU

#### 3.3.3 Bulk Pricing Calculator

**Component:** `components/business/PricingCalculator.tsx`

```typescript
function PricingCalculator() {
  const [quantity, setQuantity] = useState(50);
  const { data: pricing } = useSWR(
    `/api/pricing/calculate?qty=${quantity}`,
    fetcher
  );
  
  return (
    <div>
      <Slider 
        min={50} 
        max={10000} 
        value={quantity}
        onChange={setQuantity}
      />
      <PricingBreakdown pricing={pricing} />
      <Button onClick={requestQuote}>Request Quote</Button>
    </div>
  );
}
```

**API Endpoint:** `GET /api/pricing/calculate?qty={quantity}`
- Calculates tiered pricing
- Returns price per kg, total, shipping estimate

---

## 4. Backend Architecture

### 4.1 Technology Stack

**Runtime:** Node.js 20 LTS
**Framework:** Express.js
**Language:** TypeScript
**ORM:** Prisma
**Database:** PostgreSQL 15
**Cache:** Redis 7
**Queue:** BullMQ (Redis-based)

### 4.2 Service Architecture

```
backend/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── consumer.routes.ts
│   │   │   ├── business.routes.ts
│   │   │   └── admin.routes.ts
│   │   └── middleware/
│   │       ├── auth.ts
│   │       ├── rateLimit.ts
│   │       └── validation.ts
│   ├── services/
│   │   ├── ProductService.ts
│   │   ├── OrderService.ts
│   │   ├── SubscriptionService.ts
│   │   ├── PricingService.ts
│   │   └── ComplianceService.ts
│   ├── jobs/
│   │   ├── subscription.job.ts
│   │   ├── inventory.job.ts
│   │   └── email.job.ts
│   ├── integrations/
│   │   ├── stripe.ts
│   │   ├── shippo.ts
│   │   └── sendgrid.ts
│   └── utils/
│       ├── logger.ts
│       └── errors.ts
└── prisma/
    └── schema.prisma
```

### 4.3 API Design

#### 4.3.1 RESTful API Endpoints

**Consumer Endpoints:**

```
GET    /api/products                    # List products
GET    /api/products/:id                # Get product details
POST   /api/quiz/recommend              # Get quiz recommendation
GET    /api/recipes                     # List recipes
POST   /api/cart                        # Add to cart
POST   /api/checkout                    # Create order
POST   /api/subscriptions               # Create subscription
GET    /api/delivery/eta?zip={zip}      # Calculate delivery ETA
```

**Business Endpoints:**

```
GET    /api/business/compliance         # List compliance docs
GET    /api/business/compliance/:id     # Download document
POST   /api/business/sample-kit         # Order sample kit
GET    /api/business/pricing?qty={qty}  # Calculate bulk pricing
POST   /api/business/quote              # Request quote
GET    /api/business/orders             # List orders
GET    /api/business/orders/:id/track   # Track order
```

**Authentication:**

```
POST   /api/auth/register               # Register user
POST   /api/auth/login                  # Login
POST   /api/auth/logout                 # Logout
POST   /api/auth/refresh                # Refresh token
POST   /api/auth/forgot-password        # Password reset
```

#### 4.3.2 API Response Format

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

---

## 5. Database Architecture

### 5.1 Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL, -- 'consumer' | 'b2b' | 'admin'
  company_name VARCHAR(255),
  tax_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Products Table:**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- 'raw' | 'flavored'
  flavor VARCHAR(50),
  size_g INTEGER,
  price_usd DECIMAL(10,2) NOT NULL,
  inventory_us INTEGER DEFAULT 0,
  inventory_india INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_type VARCHAR(20) NOT NULL, -- 'd2c' | 'b2b' | 'sample_kit'
  status VARCHAR(20) NOT NULL, -- 'pending' | 'processing' | 'shipped' | 'delivered'
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  tracking_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Order Items Table:**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_usd DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Subscriptions Table:**
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  frequency VARCHAR(20) NOT NULL, -- '2weeks' | '4weeks' | '8weeks'
  status VARCHAR(20) NOT NULL, -- 'active' | 'paused' | 'canceled'
  next_billing_date DATE NOT NULL,
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Compliance Documents Table:**
```sql
CREATE TABLE compliance_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(50) NOT NULL, -- 'fda' | 'haccp' | 'iso' | 'lab_report'
  file_url VARCHAR(500) NOT NULL,
  issue_date DATE,
  expiration_date DATE,
  batch_number VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 5.2 Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_next_billing ON subscriptions(next_billing_date);
```

---

## 6. Integration Architecture

### 6.1 Payment Integration (Stripe)

**Stripe Elements:** Frontend payment form
**Stripe API:** Backend payment processing

```typescript
// Payment flow
async function processPayment(orderId: string, paymentMethodId: string) {
  const order = await getOrder(orderId);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.total_amount * 100, // cents
    currency: 'usd',
    payment_method: paymentMethodId,
    confirm: true,
    metadata: { order_id: orderId }
  });
  
  if (paymentIntent.status === 'succeeded') {
    await updateOrderStatus(orderId, 'paid');
    await sendConfirmationEmail(order.user_id);
  }
  
  return paymentIntent;
}
```

### 6.2 Shipping Integration (Shippo)

```typescript
async function createShipment(orderId: string) {
  const order = await getOrder(orderId);
  
  const shipment = await shippo.shipment.create({
    address_from: WAREHOUSE_ADDRESS,
    address_to: order.shipping_address,
    parcels: [{
      length: "10",
      width: "8",
      height: "6",
      distance_unit: "in",
      weight: calculateWeight(order.items),
      mass_unit: "lb"
    }]
  });
  
  const rate = shipment.rates[0]; // Select cheapest rate
  const transaction = await shippo.transaction.create({
    rate: rate.object_id,
    label_file_type: "PDF"
  });
  
  await updateOrder(orderId, {
    tracking_number: transaction.tracking_number,
    shipping_label_url: transaction.label_url
  });
  
  return transaction;
}
```

### 6.3 Email Integration (SendGrid)

```typescript
async function sendEmail(template: string, to: string, data: any) {
  const msg = {
    to,
    from: 'noreply@makhana.com',
    templateId: TEMPLATES[template],
    dynamicTemplateData: data
  };
  
  await sendgrid.send(msg);
}

// Email templates
const TEMPLATES = {
  ORDER_CONFIRMATION: 'd-xxx',
  SAMPLE_KIT_SHIPPED: 'd-yyy',
  SUBSCRIPTION_REMINDER: 'd-zzz',
  BULK_QUOTE: 'd-aaa'
};
```

---

## 7. Infrastructure & Deployment

### 7.1 Hosting Architecture

**Frontend:** Vercel
- Automatic deployments from Git
- Edge functions for API routes
- CDN for static assets

**Backend:** AWS ECS (Elastic Container Service)
- Docker containers
- Auto-scaling based on CPU/memory
- Load balancer (ALB)

**Database:** AWS RDS (PostgreSQL)
- Multi-AZ deployment
- Automated backups
- Read replicas for scaling

**Cache:** AWS ElastiCache (Redis)
- In-memory caching
- Session storage
- Rate limiting

**Storage:** AWS S3
- Compliance documents
- Product images
- Video content

**CDN:** Cloudflare
- Global content delivery
- DDoS protection
- SSL/TLS termination

### 7.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t makhana-api .
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin
          docker push makhana-api:latest
      - name: Deploy to ECS
        run: aws ecs update-service --cluster prod --service api --force-new-deployment
```

---

## 8. Security Architecture

### 8.1 Authentication & Authorization

**JWT-based authentication:**
- Access token (15 min expiry)
- Refresh token (7 days expiry)
- HttpOnly cookies for tokens

**Role-Based Access Control (RBAC):**
- Consumer: Access to D2C portal
- B2B: Access to B2B portal + compliance vault
- Admin: Full access

### 8.2 Data Security

- TLS 1.3 for all connections
- AES-256 encryption at rest
- bcrypt password hashing (cost factor 12)
- PCI DSS compliant payment processing
- GDPR compliant data handling

### 8.3 Rate Limiting

```typescript
// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

---

## 9. Performance Optimization

### 9.1 Caching Strategy

**Redis Cache Layers:**
- Product catalog (TTL: 1 hour)
- Pricing calculations (TTL: 15 min)
- User sessions (TTL: 7 days)
- Inventory counts (TTL: 5 min)

### 9.2 Database Optimization

- Connection pooling (max 20 connections)
- Query optimization with indexes
- Read replicas for heavy queries
- Materialized views for analytics

### 9.3 Frontend Optimization

- Code splitting by route
- Image optimization (WebP format)
- Lazy loading for images/videos
- Server-side rendering for SEO
- Static generation for marketing pages

---

## 10. Monitoring & Observability

### 10.1 Logging

**Winston Logger:**
- Structured JSON logs
- Log levels: error, warn, info, debug
- CloudWatch Logs integration

### 10.2 Metrics

**Key Metrics:**
- API response times
- Database query times
- Cache hit rates
- Error rates
- User conversion rates

**Tools:**
- AWS CloudWatch
- Datadog
- Sentry (error tracking)

### 10.3 Alerts

- API response time > 1s
- Error rate > 1%
- Database CPU > 80%
- Disk space < 20%

---

## 11. Scalability Plan

### 11.1 Horizontal Scaling

- Auto-scaling ECS tasks (2-10 instances)
- Database read replicas
- Redis cluster mode

### 11.2 Vertical Scaling

- Database: t3.medium → t3.large → t3.xlarge
- Cache: cache.t3.micro → cache.t3.small

### 11.3 CDN Scaling

- Cloudflare handles global traffic
- Edge caching for static assets
- DDoS protection

---

## 12. Disaster Recovery

### 12.1 Backup Strategy

- Database: Automated daily backups (30-day retention)
- S3: Versioning enabled
- Configuration: Stored in Git

### 12.2 Recovery Objectives

- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour

---

## 13. Technology Decisions Summary

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Frontend | Next.js 14 | SSR for SEO, great DX, Vercel deployment |
| Backend | Node.js + Express | JavaScript ecosystem, fast development |
| Database | PostgreSQL | ACID compliance, JSON support, mature |
| Cache | Redis | Fast, versatile, pub/sub support |
| Hosting | Vercel + AWS | Best-in-class for Next.js + scalable backend |
| Payment | Stripe | Industry standard, great API, compliance |
| Email | SendGrid | Reliable, templates, analytics |
| Shipping | Shippo | Multi-carrier, label generation |
| CDN | Cloudflare | Performance, security, global reach |

---

**Document Status:** Complete v1.0  
**Next Steps:** Architecture review, begin implementation
