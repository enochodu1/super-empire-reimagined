import { useEffect, useCallback } from 'react';
import { notificationService, PriceAlert } from '@/services/notificationService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/**
 * Hook to monitor price changes and trigger alerts
 * In production, this would be handled by the backend
 */
export const usePriceAlerts = (priceAlerts: PriceAlert[]) => {
  const { user } = useAuth();

  const checkPriceAlerts = useCallback(async (currentPrices: Map<string, number>) => {
    if (!user?.id) return;

    for (const alert of priceAlerts) {
      const currentPrice = currentPrices.get(alert.productId);

      if (currentPrice !== undefined) {
        const shouldTrigger = notificationService.checkPriceAlert(alert, currentPrice);

        if (shouldTrigger) {
          // Create in-app notification
          notificationService.createNotification({
            userId: user.id,
            type: 'price_alert',
            title: `Price Alert: ${alert.productName}`,
            message: `${alert.productName} is now $${currentPrice.toFixed(2)} - ${alert.condition} your target of $${alert.targetPrice.toFixed(2)}!`,
            read: false,
            metadata: {
              productId: alert.productId,
              productName: alert.productName,
              oldPrice: alert.currentPrice,
              newPrice: currentPrice,
              alertId: alert.id,
            },
          });

          // Generate and send email
          const emailTemplate = notificationService.generatePriceAlertEmail({
            productName: alert.productName,
            oldPrice: alert.currentPrice,
            newPrice: currentPrice,
            targetPrice: alert.targetPrice,
            productUrl: `${window.location.origin}/products`,
            customerName: user.user_metadata?.full_name || 'Customer',
          });

          // In production, actually send the email
          await notificationService.sendNotification(
            'email',
            { email: user.email },
            emailTemplate
          );

          // Show toast notification
          toast.success(`Price Alert!`, {
            description: `${alert.productName} is now $${currentPrice.toFixed(2)}`,
            duration: 5000,
          });
        }
      }
    }
  }, [priceAlerts, user]);

  return { checkPriceAlerts };
};

/**
 * Hook to simulate price changes for demonstration
 * In production, prices would come from the backend API
 */
export const useSimulatePriceChanges = () => {
  const simulatePriceChange = useCallback(() => {
    // Simulate price changes for demo purposes
    const mockPrices = new Map<string, number>([
      ['roma-tomatoes', Math.random() > 0.5 ? 0.95 : 1.25], // 50% chance to drop
      ['iceberg-lettuce', Math.random() > 0.7 ? 2.40 : 3.00], // 30% chance to drop
      ['organic-spinach', Math.random() > 0.6 ? 2.50 : 3.00], // 40% chance to drop
    ]);

    return mockPrices;
  }, []);

  return { simulatePriceChange };
};
