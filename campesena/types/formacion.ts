import { Pagination } from './pagination';

export interface FormacionRequest {
  codigo: string;
  nombre: string;
  version: string;
  codigoSofia: string;
  locale?: string;
}

export interface Formacion {
  id: string;
  nombre: string;
  codigoSofia: string;
  version: string;
  estado: boolean;
  fechaInicio?: string;
}

export interface Formacions {
  data: Formacion[];
  meta: {
    pagination: Pagination;
  };
}
