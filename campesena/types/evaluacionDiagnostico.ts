import { DiagnosticoPlantilla } from "./diagnosticoPlantilla";
import { RespuestaCriterio } from "./respuestaCriterio";
import { Asociacion } from "./asociacion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface EvaluacionDiagnosticoRequest {
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Seguimiento" | "Final";
  diagnostico_plantilla?: number | string;
  respuesta_criterios?: (number | string)[];
  asociacion?: number | string;
  locale?: string;
}

export interface EvaluacionDiagnostico {
  id: number;
  documentId: string;
  fechaAplicacion: string;
  tipoDiagnostico: "Inicial" | "Seguimiento" | "Final";
  diagnostico_plantilla: { data: DiagnosticoPlantilla };
  respuesta_criterios: { data: RespuestaCriterio[] };
  asociacion: { data: Asociacion };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: EvaluacionDiagnostico[] };
}

export interface EvaluacionDiagnosticos {
  data: EvaluacionDiagnostico[];
  meta: {
    pagination: Pagination;
  };
}
