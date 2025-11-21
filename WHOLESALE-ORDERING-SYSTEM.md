# Super Empire Produce - Wholesale Ordering System

## 🎯 Overview

This is a complete digital transformation of Super Empire Produce LLC's business operations. The system enables wholesale customers to browse products, place orders online, and provides an admin panel for daily price updates.

## 🚀 Key Features

### For Customers:
- ✅ **Product Catalog** - Browse 200+ produce and tortilla products
- ✅ **Search & Filter** - Find products by name, category, or subcategory
- ✅ **Shopping Cart** - Add items with quantities, view cart total
- ✅ **Online Ordering** - Submit wholesale orders with delivery info
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Real-time Pricing** - Prices updated weekly (11/17/25 - 11/22/25)

### For Super Empire Staff:
- ✅ **Admin Panel** - Secure password-protected dashboard
- ✅ **Price Management** - Update product prices daily
- ✅ **Order Management** - View and manage customer orders
- ✅ **Product Overview** - Statistics and product counts
- ✅ **CSV Export** - Export product list to Excel/CSV

## 📦 Product Catalog

### Categories:
- **Fresh Produce** (180+ items)
  - Apples, Avocados, Bananas, Peppers, Tomatoes, Lettuce, Onions, etc.
  - Exotic fruits: Dragon Fruit, Guava, Papaya, Passion Fruit
  - Root vegetables: Malanga, Yuca, Jicama
  - Herbs & Greens

- **Tortillas & Chips** (30+ items)
  - Flour tortillas (6", 8", 10", 12", 14", 17")
  - Corn tortillas (white, yellow, red, green chips)
  - Mission/Guerrero brands
  - La Mexicana brand

## 🔐 Admin Access

### Login Details:
- **URL:** `https://yoursite.com/admin`
- **Password:** `superempire2024` or `admin`

### Admin Features:
1. **Price Management Tab**
   - Search products
   - Update prices inline
   - See changes highlighted in green
   - Save all changes at once
   - Export to CSV

2. **Products Tab**
   - View total product counts
   - Category breakdowns

3. **Orders Tab**
   - View all customer orders
   - See contact details
   - Order totals and items

## 🛠️ Technical Stack

- **Frontend:** React + TypeScript
- **UI Framework:** Shadcn UI + Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router v6
- **Data Storage:** LocalStorage (MVP)
- **Icons:** Lucide React
- **Notifications:** Sonner Toast

## 📱 Page Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with company info |
| `/products` | Product catalog with search/filter |
| `/cart` | Shopping cart and checkout |
| `/admin` | Admin dashboard (password-protected) |

## 💾 Data Structure

### Product Model:
```typescript
{
  id: string;           // SKU (e.g., "APG001")
  name: string;         // Product name
  category: 'produce' | 'tortilla' | 'dairy';
  subcategory?: string; // e.g., "Apples", "Peppers"
  unit: 'LBS' | 'CT' | 'PACK' | 'DZ' | 'OZ';
  packSize: string;     // e.g., "88 CT", "30 LBS"
  price: number;        // Current price
  priceEffectiveDate: string; // ISO date
  inStock: boolean;
}
```

### Order Model:
```typescript
{
  id: string;
  orderNumber: string;  // e.g., "SEP-12345678"
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'delivered';
  notes?: string;
  createdAt: string;
}
```

## 🔄 Daily Price Update Workflow

### For Super Empire Staff:

1. **Receive Weekly Price List** (PDF/Email from suppliers)
2. **Login to Admin Panel** (`/admin`)
3. **Go to Price Management Tab**
4. **Search for products to update**
5. **Enter new prices in the "New Price" column**
6. **Click "Save Changes"** when done
7. **Prices update immediately** on customer-facing site

### Alternative: CSV Import (Future Enhancement)
- Export current prices to CSV
- Edit prices in Excel
- Re-import CSV file
- Bulk update all prices

## 📊 Business Intelligence

Based on OSINT research, this system solves Super Empire Produce's critical problems:

### Problems Solved:
- ❌ **No online presence** → ✅ Modern e-commerce site
- ❌ **No social media** → ✅ Professional digital storefront
- ❌ **Phone-only ordering** → ✅ 24/7 online ordering
- ❌ **Manual price updates** → ✅ Admin panel for quick updates
- ❌ **No order tracking** → ✅ Order management system
- ❌ **Limited market reach** → ✅ Expand to entire 4-state region

### Competitive Advantages:
1. **24/7 Ordering** - Customers can order anytime
2. **Transparent Pricing** - All prices visible upfront
3. **Easy Reordering** - Cart system saves time
4. **Mobile Access** - Order from anywhere
5. **Professional Image** - Competes with larger distributors

## 🚀 Deployment

### Option 1: GitHub Pages (Current Setup)
```bash
cd ~/Projects/super-empire-reimagined
npm run deploy
```
Live at: https://enochodu1.github.io/super-empire-reimagined/

### Option 2: Vercel/Netlify
```bash
npm run build
# Upload dist/ folder to Vercel or Netlify
```

### Option 3: Custom Domain
1. Deploy to hosting
2. Connect custom domain (e.g., `order.superempireproduce.com`)
3. Update DNS records

## 🔮 Future Enhancements

### Phase 2 (Backend Integration):
- [ ] Real backend API (Node.js + PostgreSQL or Supabase)
- [ ] Customer accounts with order history
- [ ] Email notifications for orders
- [ ] SMS notifications
- [ ] Payment processing (Stripe/Square)
- [ ] Delivery scheduling calendar

### Phase 3 (Advanced Features):
- [ ] Customer loyalty program
- [ ] Recurring orders / subscriptions
- [ ] Mobile app (React Native)
- [ ] Real-time inventory tracking
- [ ] Route optimization for deliveries
- [ ] Integration with accounting software (QuickBooks)

## 📞 Support & Contact

**Super Empire Produce LLC**
- Address: 2424 S Cesar Chavez Blvd, Dallas, TX 75215
- Phone: (469) 432-9313
- Website: superempireproduce.com
- Service Area: TX, OK, AR, LA

## 📝 License

Proprietary - © 2024 Super Empire Produce LLC

---

**Built with ❤️ by Claude Code**
*Transforming a local produce distributor into a digital-first wholesale operation*
