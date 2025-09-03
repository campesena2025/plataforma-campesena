import { ServicioParticipante } from "./servicioParticipante";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface FormacionRequest {
  codigoFormacion: string;
  nombreDiseno: string;
  codigoDiseno: string;
  versionDiseno: string;
  codigoSofia: string;
  servicio_participantes?: (number | string)[];
  locale?: string;
}

export interface Formacion {
  id: number;
  documentId: string;
  codigoFormacion: string;
  nombreDiseno: string;
  codigoDiseno: string;
  versionDiseno: string;
  codigoSofia: string;
  servicio_participantes: { data: ServicioParticipante[] };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Formacion[] };
}

export interface Formacions {
  data: Formacion[];
  meta: {
    pagination: Pagination;
  };
}