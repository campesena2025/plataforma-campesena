import { User } from "./user";
import { Pagination } from "./pagination";
import { Asociacion } from "./asociacion";

export interface ParticipanteRequest {
  numeroDocumento: string;
  nombreCompleto: string;
  genero: "Masculino" | "Femenino" | "No Binario";
  correoElectronico: string;
  numeroContacto: number;
  asociacions: number[] | string[];
  tipoPoblacion: "VULNERABLE" | "GENERAL";
  edad: number;
  nivelEstudio:
    | "Ninguno"
    | "Primaria"
    | "Secundaria"
    | "Técnico"
    | "Tecnológico"
    | "Universitario"
    | "Postgrado";
  locale?: string;
}

export interface Participante {
  id: number;
  documentId: string;
  numeroDocumento: string;
  nombreCompleto: string;
  genero: "Masculino" | "Femenino";
  correoElectronico: string;
  numeroContacto: number;
  asociacions: Asociacion[];
  tipoPoblacion: "VULNERABLE" | "GENERAL";
  edad: number;
  nivelEstudio:
    | "Ninguno"
    | "Primaria"
    | "Secundaria"
    | "Técnico"
    | "Tecnológico"
    | "Universitario"
    | "Postgrado";
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Participante[] };
}

export interface Participantes {
  data: Participante[];
  meta: {
    pagination: Pagination;
  };
}
