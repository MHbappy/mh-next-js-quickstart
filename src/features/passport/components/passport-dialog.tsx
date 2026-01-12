import { Passport } from '@/types/passport';
import { passportFormValues } from '../schemas/passport-schema';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { PassportForm } from './passport-form';

interface PassportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passport?: Passport;
  onSubmit: (data: passportFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function PassportDialog({
  open,
  onOpenChange,
  passport,
  onSubmit,
  isLoading = false
}: PassportDialogProps) {
  const isEditMode = !!passport;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Passport' : 'Add New Passport'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Update the passport information below.'
              : 'Fill in the details to create a new passport record.'}
          </DialogDescription>
        </DialogHeader>
        <PassportForm
          passport={passport}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitButtonText={isEditMode ? 'Update Passport' : 'Create Passport'}
        />
      </DialogContent>
    </Dialog>
  );
}
