/**
 * Local Database Management for Grocery Empire
 *
 * This module provides a simple localStorage-based database for products, orders, and customers.
 * Can be easily upgraded to IndexedDB or a backend API later.
 */

import { Product, Order, Customer, PriceUpdate, ShoppingList } from '@/types/product';
import { getProductImageUrl } from './productImages';

const DB_KEYS = {
  PRODUCTS: 'superempire_products',
  ORDERS: 'superempire_orders',
  CUSTOMERS: 'superempire_customers',
  PRICE_HISTORY: 'superempire_price_history',
  SETTINGS: 'superempire_settings',
  SHOPPING_LISTS: 'superempire_shopping_lists',
} as const;

// Database Interface
export class SuperEmpireDB {
  // Products
  static getAllProducts(): Product[] {
    const data = localStorage.getItem(DB_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  }

  static getProduct(id: string): Product | null {
    const products = this.getAllProducts();
    return products.find(p => p.id === id) || null;
  }

  static saveProducts(products: Product[]): void {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
  }

  static updateProduct(id: string, updates: Partial<Product>): boolean {
    const products = this.getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return false;

    // Save price update to history
    if (updates.price && updates.price !== products[index].price) {
      this.addPriceUpdate({
        id: `PU-${Date.now()}`,
        productId: id,
        oldPrice: products[index].price,
        newPrice: updates.price,
        effectiveDate: new Date().toISOString(),
        updatedBy: 'admin',
        updatedAt: new Date().toISOString(),
      });
    }

    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return true;
  }

  static updateMultiplePrices(updates: Record<string, number>): number {
    const products = this.getAllProducts();
    let updatedCount = 0;

    Object.entries(updates).forEach(([id, newPrice]) => {
      const product = products.find(p => p.id === id);
      if (product && product.price !== newPrice) {
        // Save to price history
        this.addPriceUpdate({
          id: `PU-${Date.now()}-${id}`,
          productId: id,
          oldPrice: product.price,
          newPrice: newPrice,
          effectiveDate: new Date().toISOString(),
          updatedBy: 'admin',
          updatedAt: new Date().toISOString(),
        });

        product.price = newPrice;
        product.priceEffectiveDate = new Date().toISOString();
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      this.saveProducts(products);
    }

    return updatedCount;
  }

  // Orders
  static getAllOrders(): Order[] {
    const data = localStorage.getItem(DB_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  }

  static getOrder(id: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(o => o.id === id) || null;
  }

  static getOrdersByCustomer(customerId: string): Order[] {
    return this.getAllOrders().filter(o => o.customerId === customerId);
  }

  static addOrder(order: Order): void {
    const orders = this.getAllOrders();
    orders.push(order);
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
  }

  static updateOrderStatus(id: string, status: Order['status']): boolean {
    const orders = this.getAllOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return false;

    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
    return true;
  }

  // Customers
  static getAllCustomers(): Customer[] {
    const data = localStorage.getItem(DB_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : [];
  }

  static getCustomer(id: string): Customer | null {
    const customers = this.getAllCustomers();
    return customers.find(c => c.id === id) || null;
  }

  static getCustomerByEmail(email: string): Customer | null {
    const customers = this.getAllCustomers();
    return customers.find(c => c.email.toLowerCase() === email.toLowerCase()) || null;
  }

  static addCustomer(customer: Customer): void {
    const customers = this.getAllCustomers();
    customers.push(customer);
    localStorage.setItem(DB_KEYS.CUSTOMERS, JSON.stringify(customers));
  }

  static updateCustomer(id: string, updates: Partial<Customer>): boolean {
    const customers = this.getAllCustomers();
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) return false;

    customers[index] = { ...customers[index], ...updates };
    localStorage.setItem(DB_KEYS.CUSTOMERS, JSON.stringify(customers));
    return true;
  }

  // Price History
  static getPriceHistory(): PriceUpdate[] {
    const data = localStorage.getItem(DB_KEYS.PRICE_HISTORY);
    return data ? JSON.parse(data) : [];
  }

  static getPriceHistoryForProduct(productId: string): PriceUpdate[] {
    return this.getPriceHistory()
      .filter(p => p.productId === productId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  static addPriceUpdate(update: PriceUpdate): void {
    const history = this.getPriceHistory();
    history.push(update);
    localStorage.setItem(DB_KEYS.PRICE_HISTORY, JSON.stringify(history));
  }

  // Shopping Lists
  static getAllShoppingLists(): ShoppingList[] {
    const data = localStorage.getItem(DB_KEYS.SHOPPING_LISTS);
    return data ? JSON.parse(data) : [];
  }

  static getShoppingList(id: string): ShoppingList | null {
    const lists = this.getAllShoppingLists();
    return lists.find(l => l.id === id) || null;
  }

  static addShoppingList(list: ShoppingList): void {
    const lists = this.getAllShoppingLists();
    lists.push(list);
    localStorage.setItem(DB_KEYS.SHOPPING_LISTS, JSON.stringify(lists));
  }

  static updateShoppingList(id: string, updates: Partial<ShoppingList>): boolean {
    const lists = this.getAllShoppingLists();
    const index = lists.findIndex(l => l.id === id);
    if (index === -1) return false;

    lists[index] = { ...lists[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(DB_KEYS.SHOPPING_LISTS, JSON.stringify(lists));
    return true;
  }

  static deleteShoppingList(id: string): boolean {
    const lists = this.getAllShoppingLists();
    const filtered = lists.filter(l => l.id !== id);
    if (filtered.length === lists.length) return false;

    localStorage.setItem(DB_KEYS.SHOPPING_LISTS, JSON.stringify(filtered));
    return true;
  }

  // Settings
  static getSetting(key: string): any {
    const data = localStorage.getItem(DB_KEYS.SETTINGS);
    const settings = data ? JSON.parse(data) : {};
    return settings[key];
  }

  static setSetting(key: string, value: any): void {
    const data = localStorage.getItem(DB_KEYS.SETTINGS);
    const settings = data ? JSON.parse(data) : {};
    settings[key] = value;
    localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(settings));
  }

  // Utility: Clear all data (for testing/reset)
  static clearAll(): void {
    Object.values(DB_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Utility: Export all data
  static exportAll(): string {
    const data = {
      products: this.getAllProducts(),
      orders: this.getAllOrders(),
      customers: this.getAllCustomers(),
      priceHistory: this.getPriceHistory(),
      exportDate: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  }

  // Utility: Import data
  static importAll(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.products) this.saveProducts(data.products);
      if (data.orders) localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(data.orders));
      if (data.customers) localStorage.setItem(DB_KEYS.CUSTOMERS, JSON.stringify(data.customers));
      if (data.priceHistory) localStorage.setItem(DB_KEYS.PRICE_HISTORY, JSON.stringify(data.priceHistory));
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }
}

// Initialize products on first load
export const initializeProducts = (products: Product[]) => {
  const existing = SuperEmpireDB.getAllProducts();
  if (existing.length === 0) {
    // Add images to products that don't have them
    const productsWithImages = products.map(product => ({
      ...product,
      image: product.image || getProductImageUrl(product.subcategory, product.category),
    }));
    SuperEmpireDB.saveProducts(productsWithImages);
  }
};

// Search and filter helpers
export const searchProducts = (query: string, products: Product[]): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.id.toLowerCase().includes(lowerQuery) ||
    p.subcategory?.toLowerCase().includes(lowerQuery)
  );
};

export const filterByCategory = (category: string, products: Product[]): Product[] => {
  return products.filter(p => p.category === category);
};

export const filterBySubcategory = (subcategory: string, products: Product[]): Product[] => {
  return products.filter(p => p.subcategory === subcategory);
};

export const sortProducts = (
  products: Product[],
  sortBy: 'name' | 'price' | 'category'
): Product[] => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });
};
