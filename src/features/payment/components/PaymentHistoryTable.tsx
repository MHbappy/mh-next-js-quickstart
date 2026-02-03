import { PaymentTransaction } from '@/lib/api/subscription.service';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface PaymentHistoryTableProps {
  transactions: PaymentTransaction[];
  isAdmin?: boolean;
}

export function PaymentHistoryTable({
  transactions,
  isAdmin = false
}: PaymentHistoryTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>
        No payment history found.
      </div>
    );
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {isAdmin && <TableHead>User</TableHead>}
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gateway</TableHead>
            <TableHead className='text-right'>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                {format(new Date(tx.createdAt), 'MMM d, yyyy HH:mm')}
              </TableCell>
              {isAdmin && (
                <TableCell className='font-medium'>
                  {tx.userEmail || `User #${tx.userId}`}
                </TableCell>
              )}
              <TableCell>{tx.description}</TableCell>
              <TableCell>
                {tx.currency} {tx.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={tx.status === 'SUCCESS' ? 'default' : 'destructive'}
                  className={tx.status === 'SUCCESS' ? 'bg-green-500' : ''}
                >
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell>{tx.gateway}</TableCell>
              <TableCell className='text-right'>
                <span className='text-xs text-gray-400'>
                  #{tx.transactionId.slice(-8)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
