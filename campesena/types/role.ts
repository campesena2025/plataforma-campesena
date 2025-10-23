import { Permission } from './permission';
import { User } from './user';
import { Pagination } from './pagination';

export interface RoleRequest {
  name: string;
  code: string;
  description: string;
  users?: (number | string)[];
  permissions?: (number | string)[];
  locale?: string;
}

export interface Role {
  id: number;
  documentId: string;
  name: string;
  code: string;
  description: string;
  users: { data: User[] };
  permissions: { data: Permission[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Role[] };
}

export interface Roles {
  data: Role[];
  meta: {
    pagination: Pagination;
  };
}
