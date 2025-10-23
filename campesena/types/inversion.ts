import { ModeloNegocio } from './modeloNegocio';
import { User } from './user';
import { Pagination } from './pagination';

export interface InversionRequest {
  descripcion: string;
  tipoInversion: 'Inicial' | 'Diferida' | 'Capital de trabajo';
  modelo_negocio?: number | string;
  locale?: string;
}

export interface Inversion {
  id: number;
  documentId: string;
  descripcion: string;
  tipoInversion: 'Inicial' | 'Diferida' | 'Capital de trabajo';
  modelo_negocio: { data: ModeloNegocio };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Inversion[] };
}

export interface Inversions {
  data: Inversion[];
  meta: {
    pagination: Pagination;
  };
}
