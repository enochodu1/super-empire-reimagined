/**
 * Notification Service
 * Handles all notification logic including email templates, SMS, and in-app notifications
 */

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  priceDropAlerts: boolean;
  stockAlerts: boolean;
  orderUpdates: boolean;
  newProductAlerts: boolean;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  condition: 'below' | 'above';
  active: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'price_alert' | 'stock_alert' | 'order_update' | 'new_product' | 'standing_order';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Email Templates
   */

  generatePriceAlertEmail(data: {
    productName: string;
    oldPrice: number;
    newPrice: number;
    targetPrice: number;
    productUrl: string;
    customerName: string;
  }): EmailTemplate {
    const priceChange = ((data.newPrice - data.oldPrice) / data.oldPrice) * 100;
    const savings = data.oldPrice - data.newPrice;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .alert-box { background: white; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .price-comparison { display: flex; justify-content: space-around; margin: 20px 0; }
          .price-item { text-align: center; }
          .old-price { text-decoration: line-through; color: #999; font-size: 18px; }
          .new-price { color: #10b981; font-size: 32px; font-weight: bold; }
          .savings { background: #dcfce7; color: #166534; padding: 10px 20px; border-radius: 4px; display: inline-block; margin: 10px 0; }
          .cta-button { background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Price Alert Triggered!</h1>
            <p>Your target price has been reached</p>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>

            <div class="alert-box">
              <h2 style="margin-top: 0;">✅ ${data.productName}</h2>
              <p>Great news! The price has dropped ${Math.abs(priceChange).toFixed(1)}% and is now at or below your target price.</p>

              <div class="price-comparison">
                <div class="price-item">
                  <div class="old-price">$${data.oldPrice.toFixed(2)}</div>
                  <small>Old Price</small>
                </div>
                <div class="price-item">
                  <div style="font-size: 40px; color: #3b82f6;">→</div>
                </div>
                <div class="price-item">
                  <div class="new-price">$${data.newPrice.toFixed(2)}</div>
                  <small>New Price</small>
                </div>
              </div>

              <div style="text-align: center;">
                <span class="savings">💰 Save $${savings.toFixed(2)}</span>
              </div>

              <p style="text-align: center; margin-top: 20px;">
                <strong>Your Target:</strong> $${data.targetPrice.toFixed(2)}
              </p>
            </div>

            <p>This is a great opportunity to stock up! Prices can change quickly, so act fast.</p>

            <div style="text-align: center;">
              <a href="${data.productUrl}" class="cta-button">Order Now</a>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              You're receiving this email because you set a price alert for ${data.productName}.
              <a href="/notifications">Manage your alerts</a>
            </p>
          </div>

          <div class="footer">
            <p>Grocery Empire - Fresh Wholesale Produce Delivered</p>
            <p>This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Price Alert: ${data.productName}

Hi ${data.customerName},

Great news! The price for ${data.productName} has dropped ${Math.abs(priceChange).toFixed(1)}%.

Old Price: $${data.oldPrice.toFixed(2)}
New Price: $${data.newPrice.toFixed(2)}
Your Target: $${data.targetPrice.toFixed(2)}

You save: $${savings.toFixed(2)}

Order now: ${data.productUrl}

This is a great opportunity to stock up! Prices can change quickly, so act fast.

---
Grocery Empire
Manage alerts: /notifications
    `;

    return {
      subject: `🔔 Price Alert: ${data.productName} is now $${data.newPrice.toFixed(2)}!`,
      html,
      text,
    };
  }

  generateOrderConfirmationEmail(data: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    tax: number;
    total: number;
    deliveryDate: string;
    deliveryAddress: string;
  }): EmailTemplate {
    const itemsHtml = data.items.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .order-number { background: #dcfce7; color: #166534; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f9fafb; padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; }
          .totals { background: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0; }
          .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
          .total-row { border-top: 2px solid #059669; margin-top: 10px; padding-top: 10px; font-size: 20px; font-weight: bold; color: #059669; }
          .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✅ Order Confirmed!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your order</p>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>
            <p>We've received your order and our team is preparing it for delivery. You'll receive another email when your order ships.</p>

            <div class="order-number">
              <strong>Order #${data.orderNumber}</strong>
            </div>

            <h3>Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="totals">
              <div class="totals-row">
                <span>Subtotal:</span>
                <span>$${data.subtotal.toFixed(2)}</span>
              </div>
              <div class="totals-row">
                <span>Tax:</span>
                <span>$${data.tax.toFixed(2)}</span>
              </div>
              <div class="totals-row total-row">
                <span>Total:</span>
                <span>$${data.total.toFixed(2)}</span>
              </div>
            </div>

            <div class="info-box">
              <h4 style="margin-top: 0;">📦 Delivery Information</h4>
              <p style="margin: 5px 0;"><strong>Estimated Delivery:</strong> ${data.deliveryDate}</p>
              <p style="margin: 5px 0;"><strong>Delivery Address:</strong><br>${data.deliveryAddress}</p>
            </div>

            <div class="info-box" style="background: #fef3c7; border-left-color: #f59e0b;">
              <h4 style="margin-top: 0;">ℹ️ What's Next?</h4>
              <ul style="margin: 5px 0; padding-left: 20px;">
                <li>Our team will contact you to confirm delivery schedule</li>
                <li>You'll receive a shipping notification when your order is on the way</li>
                <li>Track your order status in your <a href="/buyer-dashboard">dashboard</a></li>
              </ul>
            </div>

            <p style="margin-top: 30px;">Need help? Contact our support team or manage your order online.</p>

            <div style="text-align: center; margin-top: 30px;">
              <a href="/order-history" style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">View Order History</a>
              <a href="/products" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 0 10px;">Continue Shopping</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>Grocery Empire</strong></p>
            <p>Fresh Wholesale Produce Delivered</p>
            <p>Questions? Email us at support@superempire.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const itemsText = data.items.map(item =>
      `${item.name} - Qty: ${item.quantity} - $${(item.quantity * item.price).toFixed(2)}`
    ).join('\n');

    const text = `
Order Confirmation - Grocery Empire

Hi ${data.customerName},

Thank you for your order! We've received it and our team is preparing it for delivery.

Order #${data.orderNumber}

ORDER DETAILS:
${itemsText}

Subtotal: $${data.subtotal.toFixed(2)}
Tax: $${data.tax.toFixed(2)}
Total: $${data.total.toFixed(2)}

DELIVERY INFORMATION:
Estimated Delivery: ${data.deliveryDate}
Delivery Address: ${data.deliveryAddress}

WHAT'S NEXT:
- Our team will contact you to confirm delivery schedule
- You'll receive a shipping notification when your order is on the way
- Track your order status in your dashboard: /buyer-dashboard

Need help? Contact our support team at support@superempire.com

---
Grocery Empire
Fresh Wholesale Produce Delivered
    `;

    return {
      subject: `Order Confirmation #${data.orderNumber} - Grocery Empire`,
      html,
      text,
    };
  }

  generateStockAlertEmail(data: {
    productName: string;
    productUrl: string;
    customerName: string;
    inStock: number;
  }): EmailTemplate {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .alert-box { background: white; border-left: 4px solid #7c3aed; padding: 20px; margin: 20px 0; border-radius: 4px; text-align: center; }
          .stock-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 15px 0; font-weight: bold; }
          .cta-button { background: #7c3aed; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📦 Back in Stock!</h1>
          </div>
          <div class="content">
            <p>Hi ${data.customerName},</p>

            <div class="alert-box">
              <h2>${data.productName}</h2>
              <div class="stock-badge">✓ NOW IN STOCK</div>
              <p>${data.inStock} units available</p>
            </div>

            <p>Good news! A product you were waiting for is back in stock. Order now while supplies last!</p>

            <div style="text-align: center;">
              <a href="${data.productUrl}" class="cta-button">Order Now</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Back in Stock: ${data.productName}

Hi ${data.customerName},

Good news! ${data.productName} is back in stock.

${data.inStock} units available

Order now: ${data.productUrl}

---
Grocery Empire
    `;

    return {
      subject: `📦 Back in Stock: ${data.productName}`,
      html,
      text,
    };
  }

  /**
   * Check if price alert should be triggered
   */
  checkPriceAlert(alert: PriceAlert, currentPrice: number): boolean {
    if (!alert.active) return false;

    if (alert.condition === 'below') {
      return currentPrice <= alert.targetPrice;
    } else {
      return currentPrice >= alert.targetPrice;
    }
  }

  /**
   * Create in-app notification
   */
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    this.notifications.unshift(newNotification);
    return newNotification;
  }

  /**
   * Get user notifications
   */
  getNotifications(userId: string, unreadOnly = false): Notification[] {
    let userNotifications = this.notifications.filter(n => n.userId === userId);

    if (unreadOnly) {
      userNotifications = userNotifications.filter(n => !n.read);
    }

    return userNotifications;
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  /**
   * Mark all notifications as read
   */
  markAllAsRead(userId: string): void {
    this.notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
  }

  /**
   * Get unread count
   */
  getUnreadCount(userId: string): number {
    return this.notifications.filter(n => n.userId === userId && !n.read).length;
  }

  /**
   * Seed demo notifications for showcase
   */
  seedDemoNotifications(userId: string): void {
    // Check if user already has notifications
    if (this.getNotifications(userId).length > 0) return;

    const demoNotifications: Omit<Notification, 'id' | 'createdAt'>[] = [
      {
        userId,
        type: 'price_alert',
        title: 'Price Drop Alert: Avocados Mix #1',
        message: 'Great news! Avocados Mix #1 (84 CT) dropped from $29.50 to $26.50 - Save $3.00 per case!',
        read: false,
        metadata: { productId: 'AVG001', oldPrice: 29.50, newPrice: 26.50 },
      },
      {
        userId,
        type: 'order_update',
        title: 'Order #ORD-2024-15847 Delivered',
        message: 'Your order has been successfully delivered. Thank you for your business!',
        read: false,
        metadata: { orderId: 'ORD-2024-15847', status: 'delivered' },
      },
      {
        userId,
        type: 'stock_alert',
        title: 'Back in Stock: Organic Strawberries',
        message: 'Good news! Organic Strawberries (12/1 LB) is back in stock and available to order.',
        read: true,
        metadata: { productId: 'STR005' },
      },
      {
        userId,
        type: 'new_product',
        title: 'New Product: Dragon Fruit',
        message: 'Check out our newest addition - Dragon Fruit now available for wholesale orders!',
        read: true,
        metadata: { productId: 'DRA001' },
      },
      {
        userId,
        type: 'standing_order',
        title: 'Standing Order Reminder',
        message: 'Your weekly standing order is scheduled to process tomorrow at 6:00 AM CST.',
        read: false,
        metadata: { standingOrderId: 'SO-123', scheduledDate: '2025-11-23' },
      },
      {
        userId,
        type: 'price_alert',
        title: 'Price Alert: Tomatoes Roma',
        message: 'Tomatoes Roma (25 LBS) price increased from $24.50 to $27.50',
        read: true,
        metadata: { productId: 'TOM001', oldPrice: 24.50, newPrice: 27.50 },
      },
      {
        userId,
        type: 'order_update',
        title: 'Order #ORD-2024-15832 Out for Delivery',
        message: 'Your order is out for delivery and will arrive between 8:00 AM - 12:00 PM today.',
        read: true,
        metadata: { orderId: 'ORD-2024-15832', status: 'out-for-delivery' },
      },
    ];

    // Create notifications with staggered timestamps
    demoNotifications.forEach((notification, index) => {
      const notificationCopy = {
        ...notification,
        id: `demo-${userId}-${index}`,
        createdAt: new Date(Date.now() - (index * 3600000) - (Math.random() * 3600000)), // Stagger by hours
      };
      this.notifications.unshift(notificationCopy);
    });
  }

  /**
   * Send notification (would integrate with actual email/SMS service)
   */
  async sendNotification(
    type: 'email' | 'sms' | 'both',
    recipient: { email?: string; phone?: string },
    template: EmailTemplate
  ): Promise<boolean> {
    // In production, this would integrate with SendGrid, AWS SES, Twilio, etc.
    console.log('Sending notification:', {
      type,
      recipient,
      subject: template.subject,
    });

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Notification sent successfully');
        resolve(true);
      }, 500);
    });
  }
}

export const notificationService = NotificationService.getInstance();
