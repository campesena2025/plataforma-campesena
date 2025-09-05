import { Regional } from "./regional";
import { ServicioParticipante } from "./servicioParticipante";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface CentroFormacionRequest {
  codigo: string;
  nombre: string;
  regional?: number | string;
  servicio_participantes?: (number | string)[];
  locale?: string;
}

export interface CentroFormacion {
  id: number;
  documentId: string;
  codigo: string;
  nombre: string;
  regional: { data: Regional };
  servicio_participantes: { data: ServicioParticipante[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: CentroFormacion[] };
}

export interface CentroFormacions {
  data: CentroFormacion[];
  meta: {
    pagination: Pagination;
  };
}
