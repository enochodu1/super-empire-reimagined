// Product type definitions for Super Empire Produce

export type ProductCategory = 'produce' | 'tortilla' | 'dairy';

export type ProductUnit = 'LBS' | 'CT' | 'PACK' | 'DZ' | 'OZ';

// Expanded subcategory types for better organization
export type ProduceSubcategory =
  // Fruits
  | 'Apples' | 'Citrus' | 'Berries' | 'Grapes' | 'Melons'
  | 'Tropical Fruits' | 'Stone Fruits' | 'Exotic Fruits' | 'Dried Fruits'
  // Vegetables - Leafy & Salad
  | 'Lettuce' | 'Cabbage' | 'Greens' | 'Herbs' | 'Salads'
  // Vegetables - Root & Tubers
  | 'Carrots' | 'Beets' | 'Potatoes' | 'Onions' | 'Garlic' | 'Root Vegetables'
  // Vegetables - Other
  | 'Peppers' | 'Tomatoes' | 'Tomatillos' | 'Cucumbers' | 'Squash'
  | 'Eggplant' | 'Corn' | 'Mushrooms' | 'Celery'
  // Specialty & Mexican
  | 'Nopales' | 'Specialty' | 'Mexican Produce'
  // Prepared & Convenience
  | 'Pre-Cut Vegetables' | 'Pre-Cut Fruits' | 'Salad Mix' | 'Ready-to-Use';

export type TortillaSubcategory =
  | 'Mission/Guerrero' | 'La Rancherita' | 'El Mexicano' | 'Azteca Foods'
  | 'Flour Tortillas' | 'Corn Tortillas' | 'Specialty Tortillas';

// Product tags for advanced filtering
export type ProductTag =
  // Quality & Source
  | 'organic' | 'conventional' | 'local' | 'imported' | 'farm-fresh'
  | 'premium' | 'economy' | 'restaurant-grade'
  // Preparation & Handling
  | 'whole' | 'pre-cut' | 'pre-washed' | 'ready-to-use' | 'peeled' | 'sliced'
  // Seasonality
  | 'in-season' | 'year-round' | 'limited-time' | 'seasonal'
  // Special Designations
  | 'heirloom' | 'specialty' | 'exotic' | 'traditional'
  // Storage & Handling
  | 'refrigerated' | 'frozen' | 'shelf-stable' | 'fresh-daily'
  // Dietary & Use Case
  | 'vegan' | 'gluten-free' | 'non-gmo' | 'food-service'
  // Popular & Featured
  | 'bestseller' | 'new-arrival' | 'trending' | 'staff-pick';

export interface PriceTier {
  minQuantity: number;
  price: number;
  discount?: number; // percentage off
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string; // e.g., "Apples", "Mission/Guerrero"
  department?: string; // Higher-level grouping: "Fresh Produce", "Prepared", "Bakery"
  unit: ProductUnit;
  packSize: string; // e.g., "88 CT", "30 LBS", "6/80 CT"
  price: number;
  priceEffectiveDate: string; // ISO date string
  inStock: boolean;
  description?: string;
  image?: string;
  sku?: string;
  minOrderQuantity?: number;
  priceTiers?: PriceTier[]; // Bulk pricing
  tags?: ProductTag[]; // Multiple tags for advanced filtering
  origin?: string; // "USA", "Mexico", "California", etc.
  seasonality?: 'year-round' | 'seasonal' | 'limited';
  preparationLevel?: 'whole' | 'pre-cut' | 'ready-to-use' | 'prepared';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
}

export interface Customer {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  taxId?: string;
  accountStatus: 'active' | 'inactive' | 'pending';
  createdAt: string;
  orders: string[]; // order IDs
}

export interface PriceUpdate {
  id: string;
  productId: string;
  oldPrice: number;
  newPrice: number;
  effectiveDate: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string; // "Monday Order", "Weekly Staples"
  description?: string;
  items: { productId: string; quantity: number }[];
  customerId?: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
}
