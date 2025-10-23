import { Municipio } from './municipio';
import { Asociacion } from './asociacion';
import { User } from './user';
import { Pagination } from './pagination';

export interface DepartamentoRequest {
  divipola: string;
  nombre: string;
  municipios?: (number | string)[];
  regionGeografica: string;
  abreviatura: string;
  zonaSena: string;
  latitud: string;
  longitud: string;
  asociacion?: number | string;
  locale?: string;
}

export interface Departamento {
  id: number;
  documentId: string;
  divipola: string;
  nombre: string;
  municipios: Municipio[];
  regionGeografica: string;
  abreviatura: string;
  zonaSena: string;
  latitud: string;
  longitud: string;
  asociacion: Asociacion;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: User | null;
  updatedBy: User | null;
  locale: string;
  localizations: { data: Departamento[] };
}

export interface Departamentos {
  data: Departamento[];
  meta: {
    pagination: Pagination;
  };
}
