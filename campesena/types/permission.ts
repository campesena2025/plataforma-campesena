import { Role } from "./role";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface PermissionRequest {
  action: string;
  actionParameters: string;
  subject: string;
  properties: string;
  conditions: string;
  role?: number | string;
  locale?: string;
}

export interface Permission {
  id: number;
  documentId: string;
  action: string;
  actionParameters: string;
  subject: string;
  properties: string;
  conditions: string;
  role: { data: Role };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Permission[] };
}

export interface Permissions {
  data: Permission[];
  meta: {
    pagination: Pagination;
  };
}