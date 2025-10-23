import { SeccionDiagnostico } from './seccionDiagnostico';
import { RespuestaCriterio } from './respuestaCriterio';
import { User } from './user';
import { Pagination } from './pagination';

export interface CriterioEvaluacionRequest {
  textoPregunta: string;
  seccion_diagnostico?: number | string;
  respuesta_criterios?: (number | string)[];
  locale?: string;
}

export interface CriterioEvaluacion {
  id: number;
  documentId: string;
  textoPregunta: string;
  seccion_diagnostico: { data: SeccionDiagnostico };
  respuesta_criterios: { data: RespuestaCriterio[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: CriterioEvaluacion[] };
}

export interface CriterioEvaluacions {
  data: CriterioEvaluacion[];
  meta: {
    pagination: Pagination;
  };
}
