import { EmployeeListPage } from '@/features/employees/components/employee-list-page';

export const metadata = {
  title: 'Employees | Dashboard',
  description: 'Manage employee records'
};

export default function EmployeesPage() {
  return <EmployeeListPage />;
}
