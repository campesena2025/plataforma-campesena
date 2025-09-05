import { DiagnosticoPlantilla } from "./diagnosticoPlantilla";
import { CriterioEvaluacion } from "./criterioEvaluacion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface SeccionDiagnosticoRequest {
  nombreSeccion: string;
  diagnostico_plantilla?: number | string;
  criterio_evaluacions?: (number | string)[];
  locale?: string;
}

export interface SeccionDiagnostico {
  id: number;
  documentId: string;
  nombreSeccion: string;
  diagnostico_plantilla: { data: DiagnosticoPlantilla };
  criterio_evaluacions: { data: CriterioEvaluacion[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: SeccionDiagnostico[] };
}

export interface SeccionDiagnosticos {
  data: SeccionDiagnostico[];
  meta: {
    pagination: Pagination;
  };
}
