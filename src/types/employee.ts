/**
 * Employee Type Definitions
 * Based on Spring Boot Employee API
 */

export interface Employee {
  id: number;
  name: string;
  address: string;
  gender: string;
  fatherName?: string;
  isMarried?: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: number;
  updatedBy?: number;
}

export interface CreateEmployeeDto {
  name: string;
  address: string;
  gender: string;
  fatherName?: string;
  isMarried?: boolean;
}

export type UpdateEmployeeDto = CreateEmployeeDto;

export interface EmployeeApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export interface EmployeeListResponse extends EmployeeApiResponse<Employee[]> {
  data: Employee[];
}

export interface EmployeeSingleResponse extends EmployeeApiResponse<Employee> {
  data: Employee;
}

export interface EmployeeDeleteResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// Gender options
export const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
] as const;

export type GenderType = (typeof GENDER_OPTIONS)[number]['value'];
