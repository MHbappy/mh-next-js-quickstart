import {
  CreatePassportDto,
  PassportListResponse,
  PassportSingleResponse
} from '@/types/passport';
import { apiClient } from './client';

export class PassportService {
  static async createPassport(
    data: CreatePassportDto
  ): Promise<PassportSingleResponse> {
    const response = await apiClient.post<PassportSingleResponse>(
      '/passport-info',
      data
    );
    return response.data;
  }

  static async getAllPassport(): Promise<PassportListResponse> {
    const response =
      await apiClient.get<PassportListResponse>('/passport-info');
    return response.data;
  }
}
