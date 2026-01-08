# Employee Management Feature

This feature provides complete CRUD (Create, Read, Update, Delete) functionality for managing employee records, integrated with the Spring Boot backend API.

## 📁 File Structure

```
src/features/employees/
├── components/
│   ├── employee-form.tsx           # Form component for create/edit
│   ├── employee-table.tsx          # Data table with search & pagination
│   ├── employee-columns.tsx        # Table column definitions
│   ├── employee-dialog.tsx         # Create/Edit dialog
│   ├── employee-view-dialog.tsx    # View details dialog
│   ├── delete-employee-dialog.tsx  # Delete confirmation dialog
│   └── employee-list-page.tsx      # Main page component
├── schemas/
│   └── employee-schema.ts          # Zod validation schema
└── index.ts                        # Exports
```

## 🚀 Features

- ✅ **Create Employee** - Add new employee records with validation
- ✅ **View Employees** - List all employees in a searchable table
- ✅ **View Details** - See complete employee information
- ✅ **Update Employee** - Edit existing employee records
- ✅ **Delete Employee** - Remove employee records with confirmation
- ✅ **Search & Filter** - Search employees by name
- ✅ **Pagination** - Navigate through employee records
- ✅ **Form Validation** - Client-side validation with Zod
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - Toast notifications for success/error
- ✅ **Responsive Design** - Works on all screen sizes

## 📝 Employee Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Full name of the employee |
| Address | String | Yes | Complete address |
| Gender | Select | Yes | Male, Female, or Other |
| Father's Name | String | No | Father's name |
| Marital Status | Boolean | No | Married or Unmarried |

## 🔌 API Integration

The feature integrates with the following Spring Boot API endpoints:

- `POST /api/v1/employees` - Create employee
- `GET /api/v1/employees` - Get all employees
- `GET /api/v1/employees/{id}` - Get employee by ID
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee

All requests automatically include JWT authentication via the API client.

## 🎯 Usage

### Accessing the Page

Navigate to `/dashboard/employees` or use the keyboard shortcut `e + e` from the command palette.

### Creating an Employee

1. Click the "Add Employee" button
2. Fill in the required fields (Name, Address, Gender)
3. Optionally add Father's Name and Marital Status
4. Click "Create Employee"

### Editing an Employee

1. Click the actions menu (⋮) on any employee row
2. Select "Edit"
3. Update the fields
4. Click "Update Employee"

### Viewing Employee Details

1. Click the actions menu (⋮) on any employee row
2. Select "View Details"

### Deleting an Employee

1. Click the actions menu (⋮) on any employee row
2. Select "Delete"
3. Confirm the deletion

## 🔧 Technical Details

### State Management

- Uses React hooks (`useState`, `useEffect`) for local state
- Form state managed by React Hook Form
- No global state required

### Validation

Form validation is handled by Zod with the following rules:

```typescript
{
  name: string (1-255 chars, required)
  address: string (1-500 chars, required)
  gender: string (required)
  fatherName: string (0-255 chars, optional)
  isMarried: boolean (optional)
}
```

### Components Used

- **Shadcn UI Components**: Button, Form, Input, Textarea, Select, Switch, Dialog, AlertDialog, Table, Badge, Card
- **TanStack Table**: For data table functionality
- **React Hook Form**: For form management
- **Zod**: For schema validation
- **date-fns**: For date formatting
- **Sonner**: For toast notifications

## 🎨 Styling

The feature follows the application's design system:

- Uses Tailwind CSS for styling
- Follows Shadcn UI component patterns
- Responsive design with mobile support
- Dark mode compatible

## 🔐 Authentication

All API requests require authentication. The feature:

- Automatically includes JWT tokens via the API client
- Handles 401 errors with automatic token refresh
- Redirects to login if authentication fails

## 🧪 Testing

To test the feature:

1. Ensure the Spring Boot backend is running on `http://localhost:8080`
2. Login to the application
3. Navigate to `/dashboard/employees`
4. Test all CRUD operations

## 📚 Related Files

- **Types**: `/src/types/employee.ts`
- **API Service**: `/src/lib/api/employee.service.ts`
- **Page Route**: `/src/app/dashboard/employees/page.tsx`
- **Navigation**: `/src/config/nav-config.ts`

## 🐛 Troubleshooting

### API Errors

If you encounter API errors:

1. Check that the backend is running
2. Verify the API base URL in `.env.local`
3. Ensure you're logged in with a valid token
4. Check browser console for detailed error messages

### Form Validation Errors

If form validation isn't working:

1. Check that all required fields are filled
2. Verify field length constraints
3. Check browser console for Zod validation errors

## 🚀 Future Enhancements

Potential improvements:

- [ ] Advanced filtering (by gender, marital status)
- [ ] Sorting by different columns
- [ ] Export to CSV/Excel
- [ ] Bulk operations (delete multiple)
- [ ] Employee profile pictures
- [ ] Audit log viewing
- [ ] Advanced search with multiple criteria
