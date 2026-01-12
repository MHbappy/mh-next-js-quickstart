'use client';

import {
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader
} from '@/components/ui/alert-dialog';
import { Passport } from '@/types/passport';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@radix-ui/react-alert-dialog';

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
  return (
    <AlertDialog>
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
          <AlertDialogAction>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                await onConfirm();
              }}
              disabled={isLoading}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            ></AlertDialogAction>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
