// SMS Service using Twilio
// Note: Twilio SDK requires Node.js environment and cannot run in browser
// This service is for demonstration and would need a backend API endpoint

export interface SMSData {
  to: string;
  message: string;
}

export const sendSMS = async (data: SMSData): Promise<boolean> => {
  try {
    // In production, this would call your backend API endpoint
    // which would then use Twilio to send the SMS
    const response = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send SMS');
    }

    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

export const sendOrderConfirmationSMS = async (
  phone: string,
  orderId: string,
  total: string
): Promise<boolean> => {
  const message = `Super Empire Produce: Your order #${orderId} ($${total}) has been received! We'll notify you when it's ready for delivery. Questions? Call (469) 432-9313`;

  return await sendSMS({
    to: phone,
    message,
  });
};

export const sendDeliveryNotificationSMS = async (
  phone: string,
  orderId: string,
  estimatedTime: string
): Promise<boolean> => {
  const message = `Super Empire Produce: Your order #${orderId} is out for delivery! Estimated arrival: ${estimatedTime}. Track at superempireproduce.com/orders`;

  return await sendSMS({
    to: phone,
    message,
  });
};

export const sendDeliveryCompleteSMS = async (
  phone: string,
  orderId: string
): Promise<boolean> => {
  const message = `Super Empire Produce: Your order #${orderId} has been delivered! Thank you for your business. Rate your experience at superempireproduce.com/feedback`;

  return await sendSMS({
    to: phone,
    message,
  });
};

// Format phone number to E.164 format
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Add +1 for US numbers if not present
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }

  return phone; // Return as-is if format is unclear
};
