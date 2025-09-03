import { Media } from "./media";
import { ProyectoProductivo } from "./proyectoProductivo";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface PortafolioRequest {
  tipoPortafolio: "Producto" | "Servicio";
  codigoUNSPSC: string;
  latitud: number;
  longitud: number;
  nombre: string;
  descripcion: string;
  nombreComercial: string;
  uso: string;
  magnitud: string;
  unidadMedida: string;
  presentacionComercial: string;
  horarioAtencion: string;
  logo?: number | string;
  proyecto_productivo?: number | string;
  composicionProducto: string;
  caracteristicasSensoriales: string;
  caracterisiticasFisicas: string;
  condicionesConservacion: string;
  vidaUtil: number;
  precauciones: string;
  componentesServicio: string;
  caracteristicasServicio: string;
  condicionesServicio: string;
  costoServicio: number;
  recomendacionesServicio: string;
  Decreto: string;
  resolucion: string;
  normaTecnica: string;
  resolucionRotulado: string;
  conceptoSanitario: string;
  locale?: string;
}

export interface Portafolio {
  id: number;
  documentId: string;
  tipoPortafolio: "Producto" | "Servicio";
  codigoUNSPSC: string;
  latitud: number;
  longitud: number;
  nombre: string;
  descripcion: string;
  nombreComercial: string;
  uso: string;
  magnitud: string;
  unidadMedida: string;
  presentacionComercial: string;
  horarioAtencion: string;
  logo: { data: Media };
  proyecto_productivo: { data: ProyectoProductivo };
  composicionProducto: string;
  caracteristicasSensoriales: string;
  caracterisiticasFisicas: string;
  condicionesConservacion: string;
  vidaUtil: number;
  precauciones: string;
  componentesServicio: string;
  caracteristicasServicio: string;
  condicionesServicio: string;
  costoServicio: number;
  recomendacionesServicio: string;
  Decreto: string;
  resolucion: string;
  normaTecnica: string;
  resolucionRotulado: string;
  conceptoSanitario: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Portafolio[] };
}

export interface Portafolios {
  data: Portafolio[];
  meta: {
    pagination: Pagination;
  };
}