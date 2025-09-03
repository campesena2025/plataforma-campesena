import { ProyectoProductivo } from "./proyectoProductivo";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface PlanMercadeoRequest {
  analisisSector: string;
  analisisMercado: string;
  analisisCompetencia: string;
  analisisProyecto: string;
  propuestaValor: string;
  ventajaCompetitiva: string;
  segmentoClientes: string;
  posicionamiento: string;
  objetivos: string;
  concepto: string;
  estrategiaPrecio: string;
  estrategiaComunicacion: string;
  estrategiaServicio: string;
  propuestaMercadeo: string;
  proyecto_productivo?: number | string;
  locale?: string;
}

export interface PlanMercadeo {
  id: number;
  documentId: string;
  analisisSector: string;
  analisisMercado: string;
  analisisCompetencia: string;
  analisisProyecto: string;
  propuestaValor: string;
  ventajaCompetitiva: string;
  segmentoClientes: string;
  posicionamiento: string;
  objetivos: string;
  concepto: string;
  estrategiaPrecio: string;
  estrategiaComunicacion: string;
  estrategiaServicio: string;
  propuestaMercadeo: string;
  proyecto_productivo: { data: ProyectoProductivo };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: PlanMercadeo[] };
}

export interface PlanMercadeos {
  data: PlanMercadeo[];
  meta: {
    pagination: Pagination;
  };
}