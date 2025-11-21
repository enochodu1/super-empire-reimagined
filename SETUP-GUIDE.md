# Super Empire Produce - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd super-empire-reimagined
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Access Admin Panel
Navigate to `http://localhost:5173/admin`
- Password: `superempire2024` or `admin`

## 📦 What's Included

### ✅ Complete Features:
- Product catalog with 200+ items (produce & tortillas)
- Shopping cart system with local storage
- Online ordering with customer information collection
- Admin panel for price management
- Order management dashboard
- CSV export functionality
- Mobile responsive design
- Real-time cart count badge

### 📄 Pages:
1. **Home** (`/`) - Landing page with company info
2. **Products** (`/products`) - Searchable product catalog
3. **Cart** (`/cart`) - Shopping cart and checkout
4. **Admin** (`/admin`) - Password-protected admin dashboard

## 🎯 Testing Checklist

### Customer Flow:
- [ ] Browse products on `/products`
- [ ] Search for specific items
- [ ] Filter by category/subcategory
- [ ] Add items to cart with quantities
- [ ] View cart (notice badge updates)
- [ ] Review cart items
- [ ] Update quantities in cart
- [ ] Remove items from cart
- [ ] Fill out customer information
- [ ] Submit order
- [ ] See success notification

### Admin Flow:
- [ ] Navigate to `/admin`
- [ ] Login with password
- [ ] View price management tab
- [ ] Search for products
- [ ] Update product prices
- [ ] Save price changes
- [ ] Export product list to CSV
- [ ] View orders tab
- [ ] Check submitted orders
- [ ] View product statistics

## 🔧 Customization

### Update Company Info:
Edit these files:
- `src/components/Footer.tsx` - Contact info, address
- `src/components/About.tsx` - Company description
- `src/components/Hero.tsx` - Homepage headline

### Change Admin Password:
Edit `src/pages/Admin.tsx`, line ~35:
```typescript
if (password === 'YOUR_NEW_PASSWORD') {
  // ...
}
```

### Update Tax Rate:
Edit `src/pages/Cart.tsx`, line ~60:
```typescript
const tax = subtotal * 0.0825; // Change 0.0825 to your state's rate
```

### Add New Products:
Edit `src/data/products.ts` or `src/data/tortillaProducts.ts`:
```typescript
{
  id: 'NEW001',
  name: 'Product Name',
  category: 'produce',
  subcategory: 'Category',
  unit: 'LBS',
  packSize: '50 LBS',
  price: 29.99,
  priceEffectiveDate: '2025-11-17',
  inStock: true,
}
```

## 📱 Mobile Testing

Test on different devices:
- iOS Safari
- Android Chrome
- Tablet views
- Desktop browsers

Key features to verify:
- Navigation menu works on mobile
- Product cards are readable
- Cart badge is visible
- Forms are easy to fill
- Admin panel is usable

## 🚀 Deployment Options

### Option 1: Lovable (Recommended for Quick Deploy)
1. Push changes to GitHub
2. Open your Lovable project
3. Click "Share" → "Publish"
4. Get live URL instantly

### Option 2: Vercel (Free, Custom Domain)
```bash
npm install -g vercel
vercel login
vercel
```

### Option 3: Netlify (Drag & Drop)
```bash
npm run build
```
Then drag `dist/` folder to Netlify.

### Option 4: Traditional Hosting
```bash
npm run build
```
Upload `dist/` folder to your web host via FTP/cPanel.

## 🔐 Security Considerations

### For Production:
1. **Admin Authentication**
   - Replace localStorage password with proper backend auth
   - Use JWT tokens or OAuth
   - Add rate limiting

2. **Data Storage**
   - Move from localStorage to real database
   - Use Supabase, Firebase, or PostgreSQL
   - Implement proper data validation

3. **Order Processing**
   - Add email notifications (SendGrid, Mailgun)
   - Implement webhook for order confirmations
   - Add SMS notifications for staff

4. **Payment Integration**
   - Add Stripe or Square for payments
   - Implement invoicing system
   - Add payment terms for wholesale customers

## 📊 Analytics & Tracking

### Recommended Integrations:
- **Google Analytics** - Track visitor behavior
- **Hotjar** - See how users interact
- **Meta Pixel** - Facebook ads tracking
- **Microsoft Clarity** - Session recordings

Add tracking codes to `index.html` or use React Helmet.

## 🐛 Troubleshooting

### Build Errors:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Cart Not Persisting:
- Check browser localStorage is enabled
- Test in incognito mode
- Check console for errors

### Products Not Showing:
- Verify `allProducts.ts` imports both produce and tortilla products
- Check browser console for import errors
- Ensure data files are in correct location

## 📞 Support

For issues or questions:
1. Check `WHOLESALE-ORDERING-SYSTEM.md` for detailed documentation
2. Review console errors in browser DevTools (F12)
3. Check that all dependencies are installed
4. Verify Node.js version (v18+ recommended)

## 🎉 Next Steps

1. **Customize branding** - Update colors, fonts, images
2. **Add backend** - Integrate with Supabase or Firebase
3. **Enable payments** - Add Stripe for card processing
4. **Set up emails** - Automated order confirmations
5. **Add analytics** - Track customer behavior
6. **Mobile app** - Build React Native version
7. **Inventory system** - Track stock levels
8. **Delivery scheduling** - Route optimization

## 📝 File Structure

```
super-empire-reimagined/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx (Header with cart badge)
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ui/ (Shadcn components)
│   ├── contexts/
│   │   └── CartContext.tsx (Cart state management)
│   ├── data/
│   │   ├── products.ts (Produce items)
│   │   ├── tortillaProducts.ts (Tortilla items)
│   │   └── allProducts.ts (Combined catalog)
│   ├── pages/
│   │   ├── Index.tsx (Home page)
│   │   ├── Products.tsx (Product catalog)
│   │   ├── Cart.tsx (Shopping cart)
│   │   ├── Admin.tsx (Admin dashboard)
│   │   └── NotFound.tsx (404 page)
│   ├── types/
│   │   └── product.ts (TypeScript interfaces)
│   └── App.tsx (Main app with routing)
├── WHOLESALE-ORDERING-SYSTEM.md
├── SETUP-GUIDE.md (This file)
└── package.json
```

---

**Built for Super Empire Produce LLC**
*Transforming wholesale produce distribution through digital innovation*
