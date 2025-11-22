# Grocery Empire - Complete B2B Wholesale Produce Platform

A comprehensive, production-ready wholesale produce marketplace solution with 500+ products, advanced features, and modern UI/UX.

## 🚀 Live Demo

**Demo Site**: https://enochodu1.github.io/super-empire-reimagined/
**Admin Panel**: https://enochodu1.github.io/super-empire-reimagined/admin

## ✨ Features

### Core Functionality
- **500+ Product Catalog** - Extensive produce inventory with high-quality images
- **Real-time Ordering** - 24/7 online ordering system
- **Multi-user Support** - Buyer and Vendor dashboards
- **Advanced Cart** - Quantity adjustments, favorites, order history
- **Standing Orders** - Automated recurring orders
- **RFP System** - Request for Proposal management

### Business Features
- **Inventory Management** - Real-time stock tracking
- **Multi-location Support** - Manage multiple business locations
- **Rewards Program** - Customer loyalty system
- **Document Management** - Invoice and order document storage
- **Notification System** - Email notifications for orders, updates
- **B2B Portal** - Dedicated vendor management

### Content & Information
- **About Us** - Professional company presentation
- **Services** - Comprehensive service showcase
- **Contact** - Full contact form and information
- **FAQ** - Searchable frequently asked questions
- **Seasonal Calendar** - Produce seasonality guide
- **Recipe Blog** - Recipe ideas and cooking tips

### Technical Features
- **Performance Optimized** - Code splitting, lazy loading
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Comprehensive error boundaries
- **Image Optimization** - High-quality Unsplash integration
- **Type Safety** - Full TypeScript implementation

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: React Context
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **Email**: EmailJS
- **Deployment**: GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd grocery-empire

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🚀 Deployment

### GitHub Pages (Current Setup)

```bash
npm run deploy
```

Updates will be live within 1-2 minutes.

### Custom Domain Setup

1. Add a `CNAME` file to the `public/` folder with your domain
2. Update DNS settings to point to GitHub Pages
3. Configure custom domain in GitHub repository settings

### Alternative Platforms

**Vercel**:
```bash
vercel --prod
```

**Netlify**:
```bash
netlify deploy --prod
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components (About, Contact, etc.)
├── contexts/         # React context providers
├── data/             # Product data and static content
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── services/         # Business logic and external services
├── types/            # TypeScript type definitions
└── assets/           # Images and static files
```

## 🎨 Customization

### Branding
Update brand colors in `tailwind.config.ts`:
```typescript
colors: {
  'brand-green': '#10b981',    // Primary green
  'brand-green-light': '#6ee7b7', // Light green
  'accent-tomato': '#ef4444',  // Accent red
}
```

### Company Information
Edit company details in `src/lib/companyInfo.ts`

### Products
Add/modify products in `src/data/products.ts`

### Images
Update product images in `src/services/productImageService.ts`

## 📊 Features Documentation

### User Roles
- **Buyers**: Browse products, place orders, manage account
- **Vendors**: List products, manage inventory, view analytics
- **Admin**: Full system access, user management, analytics

### Key Pages
- `/` - Homepage with featured products
- `/products` - Full product catalog with filters
- `/cart` - Shopping cart and checkout
- `/buyer-dashboard` - Buyer account management
- `/vendor-dashboard` - Vendor account management
- `/about` - Company information
- `/contact` - Contact form and details
- `/services` - Service offerings
- `/faq` - Frequently asked questions

## 🔒 Security Notes

- Frontend-only demo (no backend required)
- Uses mock authentication (replace with real auth in production)
- Designed to integrate with your preferred backend/database
- Email notifications via EmailJS (configure with your keys)

## 🛣️ Roadmap for Production

To deploy this as a production system:

1. **Backend Integration**
   - Set up database (PostgreSQL, MongoDB, etc.)
   - Implement authentication (Firebase, Auth0, etc.)
   - Create API endpoints for products, orders, users

2. **Payment Processing**
   - Integrate Stripe or similar payment gateway
   - Add invoice generation
   - Set up recurring billing for standing orders

3. **Email System**
   - Configure transactional email service
   - Set up order confirmation templates
   - Add shipping notifications

4. **Additional Features**
   - SMS notifications
   - Advanced analytics
   - Reporting dashboard
   - API for mobile apps

## 📝 License

This is a commercial demo product. Contact for licensing information.

## 🤝 Support

For support and customization services, contact us through the demo site.

## 🎯 Perfect For

- Wholesale produce distributors
- Food service companies
- B2B marketplace startups
- Restaurant suppliers
- Grocery delivery services
- Farm-to-business platforms

---

**Built with modern best practices and ready for production deployment.**
