import { ActividadPlan } from "./actividadPlan";
import { ProyectoProductivo } from "./proyectoProductivo";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface PlanDeAccionRequest {
  fechaElaboracion: string;
  actividad_plans?: (number | string)[];
  proyecto_productivo?: number | string;
  locale?: string;
}

export interface PlanDeAccion {
  id: number;
  documentId: string;
  fechaElaboracion: string;
  actividad_plans: { data: ActividadPlan[] };
  proyecto_productivo: { data: ProyectoProductivo };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: PlanDeAccion[] };
}

export interface PlanDeAccions {
  data: PlanDeAccion[];
  meta: {
    pagination: Pagination;
  };
}
