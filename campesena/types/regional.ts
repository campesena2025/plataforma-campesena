import { CentroFormacion } from "./centroFormacion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface RegionalRequest {
  codigo: string;
  nombre: string;
  centro_formacions?: (number | string)[];
  locale?: string;
}

export interface Regional {
  id: number;
  documentId: string;
  codigo: string;
  nombre: string;
  centro_formacions: { data: CentroFormacion[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Regional[] };
}

export interface Regionals {
  data: Regional[];
  meta: {
    pagination: Pagination;
  };
}