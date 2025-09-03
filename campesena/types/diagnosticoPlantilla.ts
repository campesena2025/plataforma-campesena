import { SeccionDiagnostico } from "./seccionDiagnostico";
import { EvaluacionDiagnostico } from "./evaluacionDiagnostico";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface DiagnosticoPlantillaRequest {
  nombrePlantilla: string;
  version: string;
  seccion_diagnosticos?: (number | string)[];
  evaluacion_diagnosticos?: (number | string)[];
  locale?: string;
}

export interface DiagnosticoPlantilla {
  id: number;
  documentId: string;
  nombrePlantilla: string;
  version: string;
  seccion_diagnosticos: { data: SeccionDiagnostico[] };
  evaluacion_diagnosticos: { data: EvaluacionDiagnostico[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: DiagnosticoPlantilla[] };
}

export interface DiagnosticoPlantillas {
  data: DiagnosticoPlantilla[];
  meta: {
    pagination: Pagination;
  };
}