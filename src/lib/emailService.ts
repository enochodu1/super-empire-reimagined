import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS (call this in your app initialization)
export const initEmailJS = () => {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
  }
};

export interface OrderEmailData {
  to_email: string;
  to_name: string;
  order_id: string;
  order_total: string;
  order_date: string;
  business_name?: string;
  delivery_address: string;
  items_summary: string;
}

export const sendOrderConfirmation = async (data: OrderEmailData): Promise<boolean> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email send.');
    return false;
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: data.to_email,
        to_name: data.to_name,
        order_id: data.order_id,
        order_total: data.order_total,
        order_date: data.order_date,
        business_name: data.business_name || 'N/A',
        delivery_address: data.delivery_address,
        items_summary: data.items_summary,
      }
    );

    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email send.');
    return false;
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      'template_welcome', // You'd need to create this template
      {
        to_email: email,
        to_name: name,
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};

export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<boolean> => {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email send.');
    return false;
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      'template_password_reset', // You'd need to create this template
      {
        to_email: email,
        reset_link: resetLink,
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

export const sendDeliveryNotification = async (
  email: string,
  name: string,
  orderId: string,
  estimatedDelivery: string
): Promise<boolean> => {
  if (!SERVICE_ID || !PUBLIC_KEY) {
    console.warn('EmailJS not configured. Skipping email send.');
    return false;
  }

  try {
    await emailjs.send(
      SERVICE_ID,
      'template_delivery', // You'd need to create this template
      {
        to_email: email,
        to_name: name,
        order_id: orderId,
        estimated_delivery: estimatedDelivery,
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending delivery notification:', error);
    return false;
  }
};
