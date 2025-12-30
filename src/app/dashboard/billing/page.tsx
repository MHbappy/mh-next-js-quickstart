'use client';

import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function BillingPage() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Billing & Plans</h1>
          <p className='text-muted-foreground'>
            Manage your subscription and billing information
          </p>
        </div>

        {/* Info Alert */}
        <Alert>
          <Info className='h-4 w-4' />
          <AlertDescription>
            Billing and subscription management will be integrated with your
            backend system.
          </AlertDescription>
        </Alert>

        {/* Placeholder for billing information */}
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground text-sm'>
              Billing features will be implemented here based on your backend
              requirements.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
