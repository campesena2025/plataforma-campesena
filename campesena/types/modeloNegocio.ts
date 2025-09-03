import { ProyeccionFinanciera } from "./proyeccionFinanciera";
import { Costo } from "./costo";
import { Inversion } from "./inversion";
import { ProyectoProductivo } from "./proyectoProductivo";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ModeloNegocioRequest {
  mision: string;
  vision: string;
  alianzas: string;
  actividadesClave: string;
  propuestaValor: string;
  relacionesClientes: string;
  segmentosMercado: string;
  recursosClave: string;
  canales: string;
  estructuraCosto: string;
  FuentesIngreso: string;
  proyeccion_financieras?: (number | string)[];
  costos?: (number | string)[];
  inversions?: (number | string)[];
  proyecto_productivo?: number | string;
  locale?: string;
}

export interface ModeloNegocio {
  id: number;
  documentId: string;
  mision: string;
  vision: string;
  alianzas: string;
  actividadesClave: string;
  propuestaValor: string;
  relacionesClientes: string;
  segmentosMercado: string;
  recursosClave: string;
  canales: string;
  estructuraCosto: string;
  FuentesIngreso: string;
  proyeccion_financieras: { data: ProyeccionFinanciera[] };
  costos: { data: Costo[] };
  inversions: { data: Inversion[] };
  proyecto_productivo: { data: ProyectoProductivo };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ModeloNegocio[] };
}

export interface ModeloNegocios {
  data: ModeloNegocio[];
  meta: {
    pagination: Pagination;
  };
}