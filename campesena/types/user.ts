import { Role } from "./role";

export interface User {
  id: number;
  documentId: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  resetPasswordToken: string;
  registrationToken: string;
  isActive: boolean;
  roles: Role[];
  blocked: boolean;
  preferedLanguage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: User | null;
  updatedBy: User | null;
  locale: string;
  localizations: User[];
}
