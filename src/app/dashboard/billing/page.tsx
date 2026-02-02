'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Check } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { Skeleton } from '@/components/ui/skeleton';

export default function BillingPage() {
  const { plans, subscription, loading, handleCheckout, enabledGateways } =
    useSubscription();

  return (
    <PageContainer>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Billing & Plans</h1>
          <p className='text-muted-foreground'>
            Manage your subscription and billing information
          </p>
        </div>

        {subscription ? (
          <Alert className='border-green-200 bg-green-50'>
            <Check className='h-4 w-4 text-green-600' />
            <AlertDescription className='text-green-800'>
              You are currently subscribed to the{' '}
              <strong>{subscription.plan?.name || 'Active'}</strong> plan.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <Info className='h-4 w-4' />
            <AlertDescription>
              You are currently on the Free plan. Upgrade to unlock more
              features.
            </AlertDescription>
          </Alert>
        )}

        <div className='grid gap-6 lg:grid-cols-3'>
          {loading ? (
            <>
              <Skeleton className='h-[300px] w-full' />
              <Skeleton className='h-[300px] w-full' />
              <Skeleton className='h-[300px] w-full' />
            </>
          ) : (
            plans.map((plan) => (
              <Card
                key={plan.id}
                className={`flex flex-col ${subscription?.plan?.id === plan.id ? 'border-primary' : ''}`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.price === 0
                      ? 'Free'
                      : `$${plan.price} / ${plan.interval.toLowerCase()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-1 space-y-2'>
                  <ul className='space-y-2 text-sm'>
                    {plan.features?.map((feature, i) => (
                      <li key={i} className='flex items-center'>
                        <Check className='text-primary mr-2 h-4 w-4' />
                        {feature}
                      </li>
                    ))}
                    {!plan.features?.length && (
                      <li>Access to basic features</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  {subscription?.plan?.id === plan.id ? (
                    <Button disabled className='w-full'>
                      Current Plan
                    </Button>
                  ) : (
                    <div className='space-y-2'>
                      {plan.price === 0 ? (
                        <Button
                          className='w-full'
                          onClick={() => handleCheckout(plan.id)}
                        >
                          Get Started
                        </Button>
                      ) : (
                        <>
                          {enabledGateways.includes('STRIPE') && (
                            <Button
                              className='w-full'
                              onClick={() => handleCheckout(plan.id, 'STRIPE')}
                            >
                              Pay with Card
                            </Button>
                          )}
                          {enabledGateways.includes('PAYPAL') && (
                            <Button
                              className='w-full'
                              variant='secondary'
                              onClick={() => handleCheckout(plan.id, 'PAYPAL')}
                            >
                              Pay with PayPal
                            </Button>
                          )}
                          {!enabledGateways.length && !loading && (
                            <Button disabled className='w-full'>
                              No Payment Methods Configured
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageContainer>
  );
}
