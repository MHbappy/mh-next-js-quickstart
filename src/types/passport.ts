export interface Passport {
  id: number;
  passportType: string;
  passportNumber: string;
  passportStatus: string;
  expireDate: string;
  address: string;
  passportAmount: number;
  passportPages: number;
  employeeId: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: number;
  updatedBy?: number;
}

export interface CreatePassportDto {
  id: number;
  passportType: string;
  passportNumber: string;
  passportStatus: string;
  expireDate: string;
  address: string;
  passportAmount: number;
  passportPages: number;
  employeeId: number;
}

export type UpdatePassportDTO = CreatePassportDto;

export interface PassportApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

export interface PassportListResponse extends PassportApiResponse<Passport[]> {
  data: Passport[];
}

export interface PassportSingleResponse extends PassportApiResponse<Passport> {
  data: Passport;
}

export interface PassportDeleteResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export const PASSPORT_TYPE = [
  { label: 'Personal', value: 'PERSONAL' },
  { label: 'Business', value: 'BUSINESS' }
] as const;

export const PASSPORT_STATUS = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Active', value: 'INACTIVE' }
] as const;

export type PassportType = (typeof PASSPORT_TYPE)[number]['value'];

export type PassportStatus = (typeof PASSPORT_STATUS)[number]['value'];
