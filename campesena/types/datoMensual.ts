import { ProyeccionFinanciera } from "./proyeccionFinanciera";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface DatoMensualRequest {
  mes: number;
  proyeccion_financiera?: number | string;
  locale?: string;
}

export interface DatoMensual {
  id: number;
  documentId: string;
  mes: number;
  proyeccion_financiera: { data: ProyeccionFinanciera };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: DatoMensual[] };
}

export interface DatoMensuals {
  data: DatoMensual[];
  meta: {
    pagination: Pagination;
  };
}