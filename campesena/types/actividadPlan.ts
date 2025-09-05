import { PlanDeAccion } from "./planDeAccion";
import { SeguimientoActividad } from "./seguimientoActividad";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ActividadPlanRequest {
  aspecto: "Operacion" | "Mercadeo" | "Finanzas" | "Administracion";
  hallazgo: string;
  actividadPropuesta: string;
  plan_de_accion?: number | string;
  seguimiento_actividad?: number | string;
  locale?: string;
}

export interface ActividadPlan {
  id: number;
  documentId: string;
  aspecto: "Operacion" | "Mercadeo" | "Finanzas" | "Administracion";
  hallazgo: string;
  actividadPropuesta: string;
  plan_de_accion: { data: PlanDeAccion };
  seguimiento_actividad: { data: SeguimientoActividad };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ActividadPlan[] };
}

export interface ActividadPlans {
  data: ActividadPlan[];
  meta: {
    pagination: Pagination;
  };
}
