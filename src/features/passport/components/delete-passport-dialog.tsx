'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Passport } from '@/types/passport';
import { Loader2 } from 'lucide-react';

interface DeletePassportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passport: Passport | null;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export function DeletePassportDialog({
  open,
  onOpenChange,
  passport,
  onConfirm,
  isLoading = false
}: DeletePassportDialogProps) {
  if (!passport) return null;

  console.log('THis is delete passport');
  console.log(passport);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            employee record for{' '}
            <span className='text-foreground font-semibold'>{passport.id}</span>{' '}
            (ID: #{passport.id}).
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              await onConfirm();
            }}
            disabled={isLoading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {isLoading && <Loader2 className='mr-2 size-4 animate-spin' />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
