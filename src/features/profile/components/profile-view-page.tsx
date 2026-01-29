'use client';

import { useUser } from '@/hooks/use-user';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import ChangePasswordForm from './change-password-form';

export default function ProfileViewPage() {
  const { user } = useUser();

  return (
    <div className='flex w-full flex-col gap-6 p-4'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Profile</h1>
        <p className='text-muted-foreground'>Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='text-sm font-medium'>Name</label>
            <p className='text-muted-foreground'>
              {user?.fullName || `${user?.firstName} ${user?.lastName}`}
            </p>
          </div>
          <div>
            <label className='text-sm font-medium'>Email</label>
            <p className='text-muted-foreground'>{user?.email}</p>
          </div>
          <div>
            <label className='text-sm font-medium'>Status</label>
            <p className='text-muted-foreground'>{user?.status}</p>
          </div>
          <div>
            <label className='text-sm font-medium'>Email Verified</label>
            <p className='text-muted-foreground'>
              {user?.emailVerified ? 'Yes' : 'No'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
