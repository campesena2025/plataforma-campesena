import { Media } from "./media";
import { Pagination } from "./pagination";
import { Municipio } from "./municipio";
import { Vereda } from "./vereda";
import { EvaluacionDiagnostico } from "./evaluacionDiagnostico";
import { User } from "./user";

export interface AsociacionRequest {
  nit: string;
  nombreAsociacion: string;
  formalizada: boolean;
  departamento: number | string;
  municipio: number | string;
  vereda: number | string;
  asociacions?: (number | string)[];
  tipoOrganizacion: string;
  codigoInterno?: string;
  sector: string;
  razonCreacion?: string;
  productoServicio: string;
  codigoCIUU?: string;
  evaluacion_diagnosticos?: (number | string)[];
  locale?: string;
  foto?: number | string;
  localizations?: (number | string)[];
  observaciones?: string;
}

export interface Asociaciones {
  data: Asociacion[];
  meta: {
    pagination: Pagination;
  };
}

export interface Asociacion {
  id: number;
  documentId: string;
  nit: string;
  nombreAsociacion: string;
  formalizada: boolean;
  tipoOrganizacion: string;
  codigoInterno: string;
  sector: string;
  razonCreacion: string;
  productoServicio: string;
  codigoCIUU: string;
  observaciones: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  foto: Media;
  municipio: { data: Municipio };
  vereda: { data: Vereda };
  asociacions: { data: Asociacion[] };
  evaluacion_diagnosticos: { data: EvaluacionDiagnostico[] };
  createdBy: { data: User };
  updatedBy: { data: User };
  localizations: { data: Asociacion[] };
}
