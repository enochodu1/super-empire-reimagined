/**
 * Stripe Payment Integration
 *
 * IMPORTANT: Stripe requires a backend API for security.
 * This file contains client-side code that needs backend endpoints.
 *
 * Required Backend Endpoints:
 * - POST /api/stripe/create-checkout-session
 * - POST /api/stripe/webhook (for payment confirmations)
 *
 * See PHASE-2-ENHANCEMENTS.md for full backend implementation guide.
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartItem } from '@/types/product';

let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe instance (lazy loaded)
 */
export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn('⚠️  Stripe publishable key not found. Add VITE_STRIPE_PUBLISHABLE_KEY to .env');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export interface CheckoutSessionData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  metadata?: Record<string, string>;
}

/**
 * Create Stripe Checkout Session and redirect to payment page
 *
 * BACKEND REQUIRED: This function calls your backend API endpoint.
 *
 * Backend should:
 * 1. Create a Stripe Checkout Session with line items
 * 2. Return session ID
 * 3. Set up webhook to handle payment_intent.succeeded event
 *
 * @param sessionData Order and customer information
 * @returns Promise<{ success: boolean; error?: string }>
 */
export const createCheckoutSession = async (
  sessionData: CheckoutSessionData
): Promise<{ success: boolean; error?: string; sessionId?: string }> => {
  try {
    // TODO: Replace with your actual backend API endpoint
    const apiUrl = import.meta.env.VITE_API_URL || '';

    if (!apiUrl) {
      // Development/demo mode - simulate successful checkout
      console.warn('⚠️  No backend API configured. Using demo mode.');
      console.log('📦 Demo checkout session data:', sessionData);

      return {
        success: true,
        error: 'Demo mode: Add VITE_API_URL to .env and implement backend API',
      };
    }

    // Call backend API to create checkout session
    const response = await fetch(`${apiUrl}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: sessionData.orderId,
        customerEmail: sessionData.customerEmail,
        customerName: sessionData.customerName,
        lineItems: sessionData.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
              description: `${item.product.subcategory} - ${item.product.packSize}`,
              metadata: {
                product_id: item.product.id,
                sku: item.product.sku || item.product.id,
              },
            },
            unit_amount: Math.round(item.product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        })),
        successUrl: `${window.location.origin}/cart?payment=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart?payment=cancelled`,
        metadata: {
          orderId: sessionData.orderId,
          ...sessionData.metadata,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, sessionId };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Check if Stripe is properly configured
 */
export const isStripeConfigured = (): boolean => {
  const hasPublicKey = !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const hasApiUrl = !!import.meta.env.VITE_API_URL;
  return hasPublicKey && hasApiUrl;
};

/**
 * Format price from cents to currency string
 */
export const formatPrice = (cents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
};
