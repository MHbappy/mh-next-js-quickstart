import { Value } from '@radix-ui/react-select';
import { Employee } from './employee';

export interface Passport {}

export interface CreatePassportDto {}

export type UpdatePassportDTO = CreatePassportDto;

export interface PassportApiResponse<T> {}

export interface PassportListResponse extends PassportApiResponse<Passport[]> {}

export interface PassportDeleteResponse {}

export const PASSPORT_TYPE = [
  { label: 'Personal', value: 'PERSONAL' },
  { label: 'Business', value: 'BUSINESS' }
];

export const PASSPORT_STATUS = [{ label: '' }];
