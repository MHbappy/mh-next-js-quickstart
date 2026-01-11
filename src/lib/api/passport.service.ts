import {
  CreatePassportDto,
  PassportDeleteResponse,
  PassportListResponse,
  PassportSingleResponse,
  UpdatePassportDTO
} from '@/types/passport';
import { apiClient } from './client';
import { EmployeeSingleResponse } from '@/types/employee';

export class PassportService {
  static async createPassport(
    data: CreatePassportDto
  ): Promise<PassportSingleResponse> {
    const response = await apiClient.post<PassportSingleResponse>(
      `/passport-info`,
      data
    );
    return response.data;
  }

  static async getAllPassport(): Promise<PassportListResponse> {
    const response =
      await apiClient.get<PassportListResponse>(`/passport-info`);
    return response.data;
  }

  static async getPassportById(id: number): Promise<PassportSingleResponse> {
    const response = await apiClient.get<PassportSingleResponse>(
      `/passport-info/${id}`
    );

    return response.data;
  }

  static async updateEmployee(
    id: number,
    data: UpdatePassportDTO
  ): Promise<PassportSingleResponse> {
    const response = await apiClient.put<PassportSingleResponse>(
      `/passport-info/${id}`,
      data
    );
    return response.data;
  }

  static async DeleteEmployee(id: number): Promise<PassportDeleteResponse> {
    const response = await apiClient.delete<PassportDeleteResponse>(
      `/passport-info/${id}`
    );
    return response.data;
  }
}
