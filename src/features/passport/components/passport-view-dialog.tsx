'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Passport } from '@/types/passport';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Separator } from '@radix-ui/react-select';
import { User } from 'lucide-react';

interface PassportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passport: Passport | null;
}

export function PassportViewDialog({
  open,
  onOpenChange,
  passport
}: PassportDialogProps) {
  if (!passport) return null;

  console.log('This is passport view------');
  console.log(passport);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Passport Details</DialogTitle>
          <DialogDescription>
            Complete information about the passport
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      <div className='space-y-6'>
        <div className='space-y-4'>
          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Passport Type
              </p>
              <p className='text-base font-semibold'>{passport.passportType}</p>
            </div>
          </div>
          <Separator />

          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Passport Number
              </p>
              <p className='text-base font-semibold'>
                {passport.passportNumber}
              </p>
            </div>
          </div>

          <Separator />
          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Passport Number
              </p>
              <p className='text-base font-semibold'>
                {passport.passportNumber}
              </p>
            </div>
          </div>

          <Separator />
          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Passport Status
              </p>
              <p className='text-base font-semibold'>
                {passport.passportStatus}
              </p>
            </div>
          </div>

          <Separator />
          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Expire Date
              </p>
              <p className='text-base font-semibold'>{passport.expireDate}</p>
            </div>
          </div>

          <Separator />
          <div className='flex items-start gap-3'>
            <User className='text-muted-foreground mt-1 size-5' />
            <div className='flex-1'>
              <p className='text-muted-foreground text-sm font-medium'>
                Address
              </p>
              <p className='text-base font-semibold'>{passport.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
