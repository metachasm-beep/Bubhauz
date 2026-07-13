# Bubhauz - Baby Products Marketplace

A modern, scalable online marketplace platform for Bubhauz baby products, targeting the Indian consumer market.

## 🏗️ Architecture

### Tech Stack
- **Backend**: Node.js + Fastify + Prisma ORM
- **Frontend**: React + Vite + TailwindCSS
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Google OAuth
- **Payments**: Razorpay
- **Logistics**: Shiprocket
- **Deployment**: Vercel (Frontend), Custom hosting (Backend)
- **CI/CD**: GitHub Actions

### Project Structure
```
bubhauz/
├── apps/
│   ├── backend/        # Fastify API server
│   │   ├── src/
│   │   ├── prisma/     # Database schema & migrations
│   │   └── package.json
│   └── frontend/       # React + Vite application
│       ├── src/
│       ├── public/
│       └── package.json
├── packages/           # Shared utilities & types
├── .github/
│   └── workflows/      # CI/CD pipelines
└── package.json        # Monorepo root
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL 16+ (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/metachasm-beep/Bubhauz.git
   cd Bubhauz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Backend (`apps/backend/.env`):
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```

   Frontend (`apps/frontend/.env`):
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate --workspace=apps/backend

   # Run migrations
   npm run prisma:migrate --workspace=apps/backend
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Backend
   npm run dev --workspace=apps/backend

   # Terminal 2: Frontend
   npm run dev --workspace=apps/frontend
   ```

   Backend runs on: `http://localhost:3000`
   Frontend runs on: `http://localhost:5173`

## 📋 Development Phases

### Phase 1: Environment & Agent Configuration ✅ COMPLETE
- ✅ Monorepo scaffolding
- ✅ Core packages and dependencies
- ✅ GitHub Actions CI/CD workflows
- ✅ TypeScript configurations
- ✅ Environment templates

### Phase 2: Backend Architecture & Data Modeling 🔄 IN PROGRESS
- Relational database schema design
- API routes for products, cart, orders
- Authentication with Google OAuth
- GST calculation logic
- INR currency formatting
- Role-based access control (RBAC)

### Phase 3: Core Marketplace Integrations
- Razorpay payment gateway
- Shiprocket logistics integration
- Transactional messaging (OTP, confirmations, updates)

### Phase 4: Frontend Development & Branding
- Component library
- Homepage & product pages
- Cart & checkout flow
- CDN image optimization

### Phase 5: Testing, Compliance, & Launch Prep
- Compliance documentation (Privacy, Terms, Refund policies)
- SEO auditing
- Performance monitoring
- Load testing

## 🔧 Available Scripts

### Root
```bash
npm run dev          # Start all services in dev mode
npm run build        # Build all workspaces
npm run test         # Run tests across all workspaces
npm run lint         # Lint all workspaces
```

### Backend
```bash
npm run dev --workspace=apps/backend                 # Start dev server with hot reload
npm run build --workspace=apps/backend               # Build for production
npm run start --workspace=apps/backend               # Run production build
npm run test --workspace=apps/backend                # Run tests
npm run prisma:generate --workspace=apps/backend     # Generate Prisma client
npm run prisma:migrate --workspace=apps/backend      # Run database migrations
npm run prisma:studio --workspace=apps/backend       # Open Prisma Studio
```

### Frontend
```bash
npm run dev --workspace=apps/frontend                # Start dev server
npm run build --workspace=apps/frontend              # Build for production
npm run preview --workspace=apps/frontend            # Preview production build
npm run type-check --workspace=apps/frontend         # Type check only
```

## 🗄️ Database Schema

### Core Models
- **User**: Customer & admin accounts with Google OAuth
- **Product**: Baby products with categories, pricing, GST
- **Category**: Product categorization with hierarchy
- **Cart**: Shopping cart with items
- **Order**: Order management with GST and INR pricing
- **Review**: Product reviews with verification
- **AuditLog**: Track all critical actions

All prices are stored in **INR paise** (1 INR = 100 paise) to avoid floating-point issues.

## 🔐 Security Features

- JWT-based authentication
- Google OAuth 2.0 integration
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js security headers
- Input validation & sanitization (to be implemented)
- SQL injection prevention (Prisma ORM)

## 💳 Payment & Logistics

### Razorpay Integration
- Payment processing for Indian customers
- Support for multiple payment methods (Cards, UPI, Wallets)
- Webhook handlers for payment status updates

### Shiprocket Integration
- Automated shipping rate calculation
- AWB (Air Waybill) generation
- Real-time tracking
- Multi-carrier support

## 📱 UI/UX Principles

- **Mobile-First**: Optimized for mobile browsers
- **Trust & Safety**: Clean, soft aesthetic emphasizing baby product safety
- **Soft Aesthetic**: Pastel colors, rounded corners, gentle typography
- **Accessibility**: WCAG 2.1 compliance

## 🌍 Localization

### India-Specific Features
- INR currency formatting and storage
- GST compliance (0%, 5%, 12%, 18%, 28% categories)
- Indian address structures
- Local payment methods (UPI, etc.)
- Hindi language support (future)

## 📊 Monitoring & Analytics

- Netdata server monitoring
- GitHub Actions CI/CD status
- Crawl4AI & Monoscope for SEO auditing
- Performance metrics tracking

## 📝 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please follow the existing code structure and commit message conventions.

## 📞 Support

For issues and questions, please create a GitHub issue or contact the development team.

---

**Status**: Phase 1 Complete | Phase 2 In Progress
**Last Updated**: 2024-01-13
