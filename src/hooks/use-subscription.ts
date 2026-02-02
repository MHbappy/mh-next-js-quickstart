import { useState, useEffect } from 'react';
import {
  getActivePlans,
  initiateCheckout,
  getMySubscription,
  getEnabledGateways,
  SubscriptionPlan
} from '@/lib/api/subscription.service';

export function useSubscription() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enabledGateways, setEnabledGateways] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [plansData, subData, gateways] = await Promise.all([
          getActivePlans(),
          getMySubscription(),
          getEnabledGateways()
        ]);
        setPlans(plansData);
        setSubscription(subData);
        setEnabledGateways(gateways);
      } catch (err: any) {
        // Fallback for demo
        console.error(err);
        // If fetching gateways fails, assume Stripe is enabled by default for existing fallback UI
        // setEnabledGateways(['STRIPE']);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleCheckout = async (planId: number, gateway: string = 'STRIPE') => {
    try {
      const response = await initiateCheckout(planId, gateway);
      if (response.url) {
        window.location.href = response.url;
      }
    } catch (err) {
      console.error(err);
      alert(
        'Checkout failed. Please ensure backend is running and configured.'
      );
    }
  };

  return {
    plans,
    subscription,
    loading,
    error,
    enabledGateways,
    handleCheckout
  };
}
