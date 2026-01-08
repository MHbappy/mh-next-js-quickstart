import { apiClient } from './client';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  EmployeeListResponse,
  EmployeeSingleResponse,
  EmployeeDeleteResponse
} from '@/types/employee';

/**
 * Employee API Service
 * Handles all Employee CRUD operations
 */
export class EmployeeService {
  /**
   * Create a new employee
   * POST /api/v1/employees
   */
  static async createEmployee(
    data: CreateEmployeeDto
  ): Promise<EmployeeSingleResponse> {
    const response = await apiClient.post<EmployeeSingleResponse>(
      '/employees',
      data
    );
    return response.data;
  }

  /**
   * Get all employees
   * GET /api/v1/employees
   */
  static async getAllEmployees(): Promise<EmployeeListResponse> {
    const response = await apiClient.get<EmployeeListResponse>('/employees');
    return response.data;
  }

  /**
   * Get employee by ID
   * GET /api/v1/employees/{id}
   */
  static async getEmployeeById(id: number): Promise<EmployeeSingleResponse> {
    const response = await apiClient.get<EmployeeSingleResponse>(
      `/employees/${id}`
    );
    return response.data;
  }

  /**
   * Update employee
   * PUT /api/v1/employees/{id}
   */
  static async updateEmployee(
    id: number,
    data: UpdateEmployeeDto
  ): Promise<EmployeeSingleResponse> {
    const response = await apiClient.put<EmployeeSingleResponse>(
      `/employees/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Delete employee
   * DELETE /api/v1/employees/{id}
   */
  static async deleteEmployee(id: number): Promise<EmployeeDeleteResponse> {
    const response = await apiClient.delete<EmployeeDeleteResponse>(
      `/employees/${id}`
    );
    return response.data;
  }
}
