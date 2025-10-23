import { ModeloNegocio } from './modeloNegocio';
import { User } from './user';
import { Pagination } from './pagination';

export interface CostoRequest {
  descripcion: string;
  cantidad: number;
  valor: number;
  tipo: 'Costo Fijo' | 'Costo Variable';
  modelo_negocio?: number | string;
  locale?: string;
}

export interface Costo {
  id: number;
  documentId: string;
  descripcion: string;
  cantidad: number;
  valor: number;
  tipo: 'Costo Fijo' | 'Costo Variable';
  modelo_negocio: { data: ModeloNegocio };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Costo[] };
}

export interface Costos {
  data: Costo[];
  meta: {
    pagination: Pagination;
  };
}
