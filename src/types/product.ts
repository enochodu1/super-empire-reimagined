// Product type definitions for Super Empire Produce

export type ProductCategory = 'produce' | 'tortilla' | 'dairy';

export type ProductUnit = 'LBS' | 'CT' | 'PACK' | 'DZ' | 'OZ';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string; // e.g., "Apples", "Mission/Guerrero"
  unit: ProductUnit;
  packSize: string; // e.g., "88 CT", "30 LBS", "6/80 CT"
  price: number;
  priceEffectiveDate: string; // ISO date string
  inStock: boolean;
  description?: string;
  image?: string;
  sku?: string;
  minOrderQuantity?: number;
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
