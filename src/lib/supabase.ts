import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          business_name: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          role: 'customer' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          subcategory: string | null;
          price: number;
          unit: string;
          pack_size: string | null;
          image_url: string | null;
          stock_quantity: number;
          stock_status: 'in-stock' | 'low-stock' | 'out-of-stock';
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          business_name: string | null;
          delivery_address: string;
          delivery_city: string;
          delivery_state: string;
          delivery_zip: string;
          special_instructions: string | null;
          subtotal: number;
          tax: number;
          total: number;
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_intent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['orders']['Insert']>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          quantity: number;
          price: number;
          subtotal: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['order_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>;
      };
      shopping_lists: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          items: any; // JSON array of cart items
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['shopping_lists']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['shopping_lists']['Insert']>;
      };
      price_history: {
        Row: {
          id: string;
          product_id: string;
          old_price: number;
          new_price: number;
          changed_by: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['price_history']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}

// Helper functions for common queries
export const db = {
  // Auth helpers
  async signUp(email: string, password: string, userData: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Profile helpers
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Product helpers
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    return { data, error };
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async updateProduct(id: string, updates: any) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  async updateProductStock(id: string, quantity: number) {
    const { data, error } = await supabase
      .from('products')
      .update({
        stock_quantity: quantity,
        stock_status: quantity === 0 ? 'out-of-stock' : quantity < 10 ? 'low-stock' : 'in-stock'
      })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Order helpers
  async createOrder(orderData: any, items: any[]) {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError || !order) {
      return { data: null, error: orderError };
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return { data: null, error: itemsError };
    }

    return { data: order, error: null };
  },

  async getOrders(userId?: string) {
    let query = supabase.from('orders').select('*, order_items(*)');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  async getOrder(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', orderId)
      .single();
    return { data, error };
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    return { data, error };
  },

  // Shopping list helpers
  async getShoppingLists(userId: string) {
    const { data, error } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createShoppingList(userId: string, name: string, items: any[]) {
    const { data, error } = await supabase
      .from('shopping_lists')
      .insert({ user_id: userId, name, items })
      .select()
      .single();
    return { data, error };
  },

  async deleteShoppingList(id: string) {
    const { error } = await supabase
      .from('shopping_lists')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Price history helpers
  async logPriceChange(productId: string, oldPrice: number, newPrice: number, changedBy: string) {
    const { data, error } = await supabase
      .from('price_history')
      .insert({ product_id: productId, old_price: oldPrice, new_price: newPrice, changed_by: changedBy })
      .select()
      .single();
    return { data, error };
  },

  async getPriceHistory(productId: string) {
    const { data, error } = await supabase
      .from('price_history')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });
    return { data, error };
  },
};
