import { ModeloNegocio } from "./modeloNegocio";
import { DatoMensual } from "./datoMensual";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ProyeccionFinancieraRequest {
  anoProyeccion: number;
  modelo_negocio?: number | string;
  dato_mensual_proyeccions?: (number | string)[];
  locale?: string;
}

export interface ProyeccionFinanciera {
  id: number;
  documentId: string;
  anoProyeccion: number;
  modelo_negocio: { data: ModeloNegocio };
  dato_mensual_proyeccions: { data: DatoMensual[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ProyeccionFinanciera[] };
}

export interface ProyeccionFinancieras {
  data: ProyeccionFinanciera[];
  meta: {
    pagination: Pagination;
  };
}
