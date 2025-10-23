import { User } from './user';
import { Pagination } from './pagination';

export interface FormacionAsociacionRequest {
  nombreFormacion: string;
  codigo: string;
  version: string;
  codigoSofia: string;
  numeroFicha: string;
  asociacion: string | number;
  locale?: string;
}

export interface FormacionAsociacion {
  id: number;
  documentId: string;
  nombreFormacion: string;
  codigo: string;
  version: string;
  codigoSofia: string;
  numeroFicha: string;
  asociacion: { data: any | null };
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: FormacionAsociacion[] };
}

export interface FormacionAsociacions {
  data: FormacionAsociacion[];
  meta: {
    pagination: Pagination;
  };
}
