/**
 * Super Empire B2B Platform - Business Types
 * Based on OSINT research from actual invoices and price lists
 */

// ============================================================================
// CUSTOMER TYPES
// ============================================================================

export type CustomerType = 'wholesale' | 'frontSales';

export type PaymentTerms = 'cod' | 'net30' | 'net15' | 'prepaid';

export interface Customer {
  id: string;
  type: CustomerType;
  accountNumber?: string; // Only for wholesale
  businessName: string;
  contactName: string;
  email: string;
  phone: string;

  // Address
  billingAddress: Address;
  shippingAddress?: Address;

  // Business Details
  taxId?: string;
  businessLicense?: string;

  // Account Status
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  creditLimit?: number; // For Net 30 accounts
  paymentTerms: PaymentTerms;

  // Sales Rep Assignment
  assignedSalesRep?: string; // e.g., "Carlos Chavez", "Susane"

  // Order History Metadata
  totalOrders: number;
  lifetimeValue: number;
  averageOrderValue: number;
  lastOrderDate?: Date;

  // Preferences
  preferredDeliveryDay?: DayOfWeek;
  orderingPatterns?: string[]; // Frequently ordered SKUs

  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// ============================================================================
// PRODUCT TYPES
// ============================================================================

export type ProductCategory =
  | 'tortillas'
  | 'chips'
  | 'produce'
  | 'meat'
  | 'cheese'
  | 'chorizo'
  | 'frozen'
  | 'canned'
  | 'drinks'
  | 'grocery'
  | 'cleaning';

export type ProductBrand =
  | 'Leal'
  | 'Mission'
  | 'Guerrero'
  | 'La Mexicana'
  | 'Generic'
  | 'Various';

export type Unit = 'LBS' | 'CT' | 'OZ' | 'GL' | 'DZ' | 'PACK';

export interface Product {
  id: string; // SKU
  stockNumber?: string; // Internal stock tracking number
  name: string;
  description?: string;

  // Categorization
  category: ProductCategory;
  subcategory?: string; // e.g., "Flour Tortillas", "Chicken", "Apples"
  brand: ProductBrand;

  // Packaging
  packSize: string; // e.g., "30 LBS", "6/80 CT", "10/12 CT"
  unit: Unit;

  // Pricing
  pricing: ProductPricing;

  // Availability
  inStock: boolean;
  availableForWholesale: boolean;
  availableForFrontSales: boolean;

  // Meat-Specific (for daily pricing)
  isDailyPriced?: boolean; // True for meat products
  pricePerLb?: number; // For meat items
  pricePerBox?: number; // For meat items

  // Metadata
  imageUrl?: string;
  tags?: string[];

  createdAt: Date;
  updatedAt: Date;
  priceEffectiveDate: Date; // Week of pricing (e.g., "10/10/25-10/19/25")
}

export interface ProductPricing {
  wholesalePrice: number;
  frontSalesPrice: number;

  // Volume Discounts
  bulkDiscounts?: BulkDiscount[];

  // Historical Pricing
  priceHistory?: PriceHistoryEntry[];
}

export interface BulkDiscount {
  minQuantity: number;
  discountPercent: number;
}

export interface PriceHistoryEntry {
  price: number;
  effectiveDate: Date;
  endDate?: Date;
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export type OrderStatus =
  | 'draft'
  | 'submitted'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'outForDelivery'
  | 'delivered'
  | 'cancelled';

export type ShipVia = 'delivery' | 'pickup' | 'willCall';

export interface Order {
  id: string;
  orderNumber: string; // e.g., "0773", "41191"

  // Customer Info
  customerId: string;
  customer: Customer;

  // Order Details
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;

  // Delivery
  shipVia: ShipVia;
  deliveryDate?: Date;
  deliveryWindow?: string; // e.g., "8:00 AM - 12:00 PM"
  driverName?: string;
  route?: string;

  // Status
  status: OrderStatus;

  // Sales Info
  salesRep: string; // e.g., "Carlos Chavez", "Susane", "CC"
  paymentTerms: PaymentTerms;

  // Payment
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paidAmount: number;
  balanceDue: number;
  dueDate?: Date; // For Net 30

  // Notes
  customerNotes?: string;
  internalNotes?: string;

  // Timestamps
  createdAt: Date;
  confirmedAt?: Date;
  deliveredAt?: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  notes?: string;
}

// ============================================================================
// INVOICE TYPES
// ============================================================================

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g., "41191"

  // Reference
  orderId: string;
  order: Order;

  // Customer
  customerId: string;
  billTo: Address;
  shipTo: Address;

  // Invoice Details
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;

  // Payment
  paymentTerms: PaymentTerms;
  dueDate: Date;
  paidDate?: Date;
  paymentMethod?: string;

  // Shipping
  shipDate: Date;
  shipVia: string;
  poNumber?: string;
  rep: string;
  driverName?: string;

  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

  // Timestamps
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  quantity: number;
  description: string;
  notes?: string;
  rate: number;
  amount: number;
}

// ============================================================================
// DELIVERY & LOGISTICS TYPES
// ============================================================================

export interface DeliveryRoute {
  id: string;
  routeName: string;
  date: Date;
  driverName: string;
  vehicleId: string;

  stops: DeliveryStop[];

  status: 'planned' | 'inProgress' | 'completed';

  // Metrics
  totalMiles?: number;
  estimatedDuration?: number; // minutes
  actualDuration?: number;

  startTime?: Date;
  endTime?: Date;
}

export interface DeliveryStop {
  order: Order;
  sequence: number;
  address: Address;
  estimatedArrival: Date;
  actualArrival?: Date;
  status: 'pending' | 'arrived' | 'completed' | 'failed';
  notes?: string;
  signature?: string;
}

// ============================================================================
// CRM & SALES REP TYPES
// ============================================================================

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string;

  // Assignment
  customers: string[]; // Customer IDs
  territory?: string[];

  // Performance
  totalSales: number;
  activeCustomers: number;
  ordersThisMonth: number;

  // Commission
  commissionRate: number;
  commissionEarned: number;

  status: 'active' | 'inactive';
}

// ============================================================================
// PRICE LIST TYPES
// ============================================================================

export interface WeeklyPriceList {
  id: string;
  weekStart: Date;
  weekEnd: Date;
  effectiveWeek: string; // e.g., "10/10/25-10/19/25"

  // Meat Prices (daily update)
  meatPrices: MeatPrice[];

  // PDF Generation
  pdfUrl?: string;
  generatedAt?: Date;

  createdAt: Date;
  publishedAt?: Date;
}

export interface MeatPrice {
  productId: string;
  productName: string;
  pack: string;
  pricePerLb: number;
  pricePerBox: number;
  updatedAt: Date;
}
