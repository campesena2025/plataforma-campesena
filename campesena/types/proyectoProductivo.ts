import { Portafolio } from "./portafolio";
import { PlanMercadeo } from "./planMercadeo";
import { ServicioParticipante } from "./servicioParticipante";
import { ModeloNegocio } from "./modeloNegocio";
import { PlanDeAccion } from "./planDeAccion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ProyectoProductivoRequest {
  nombreProyecto: string;
  tiempoEstimado: number;
  Planteamiento: string;
  justificacion: string;
  beneficiarios: string;
  impactoSocial: string;
  impactoEconomico: string;
  impactoAmbiental: string;
  impactoTecnologico: string;
  analisisTendencias: string;
  factoresPoliticos: string;
  factoresEconomicos: string;
  factoresSociales: string;
  factoresTecnologicos: string;
  incertidumbres: string;
  portafolio?: number | string;
  plan_mercadeo?: number | string;
  servicio_participante?: number | string;
  modelo_negocio?: number | string;
  plan_de_accion?: number | string;
  locale?: string;
}

export interface ProyectoProductivo {
  id: number;
  documentId: string;
  nombreProyecto: string;
  tiempoEstimado: number;
  Planteamiento: string;
  justificacion: string;
  beneficiarios: string;
  impactoSocial: string;
  impactoEconomico: string;
  impactoAmbiental: string;
  impactoTecnologico: string;
  analisisTendencias: string;
  factoresPoliticos: string;
  factoresEconomicos: string;
  factoresSociales: string;
  factoresTecnologicos: string;
  incertidumbres: string;
  portafolio: { data: Portafolio };
  plan_mercadeo: { data: PlanMercadeo };
  servicio_participante: { data: ServicioParticipante };
  modelo_negocio: { data: ModeloNegocio };
  plan_de_accion: { data: PlanDeAccion };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ProyectoProductivo[] };
}

export interface ProyectoProductivos {
  data: ProyectoProductivo[];
  meta: {
    pagination: Pagination;
  };
}
