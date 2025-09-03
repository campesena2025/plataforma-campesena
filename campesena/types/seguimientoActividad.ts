import { ActividadPlan } from "./actividadPlan";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface SeguimientoActividadRequest {
  actividad_plan?: number | string;
  justificacion: string;
  acciones: string;
  responsable: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  cumplimiento: number;
  descripcion: string;
  locale?: string;
}

export interface SeguimientoActividad {
  id: number;
  documentId: string;
  actividad_plan: { data: ActividadPlan };
  justificacion: string;
  acciones: string;
  responsable: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  cumplimiento: number;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: SeguimientoActividad[] };
}

export interface SeguimientoActividads {
  data: SeguimientoActividad[];
  meta: {
    pagination: Pagination;
  };
}