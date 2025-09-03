import { EvaluacionDiagnostico } from "./evaluacionDiagnostico";
import { CriterioEvaluacion } from "./criterioEvaluacion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface RespuestaCriterioRequest {
  puntaje: number;
  hallazgos: string;
  evaluacion_diagnostico?: number | string;
  criterio_evaluacion?: number | string;
  locale?: string;
}

export interface RespuestaCriterio {
  id: number;
  documentId: string;
  puntaje: number;
  hallazgos: string;
  evaluacion_diagnostico: { data: EvaluacionDiagnostico };
  criterio_evaluacion: { data: CriterioEvaluacion };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: RespuestaCriterio[] };
}

export interface RespuestaCriterios {
  data: RespuestaCriterio[];
  meta: {
    pagination: Pagination;
  };
}