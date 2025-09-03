import { ParticipanteAsociacion } from "./participanteAsociacion";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ParticipanteRequest {
  numeroDocumento: string;
  nombreCompleto: string;
  genero: "Masculino" | "Femenino";
  correoElectronico: string;
  numeroContacto: number;
  tipoParticipante: "Representante Legal" | "Miembro" | "Otro";
  participante_asociacion?: number | string;
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
  tipoParticipante: "Representante Legal" | "Miembro" | "Otro";
  participante_asociacion: { data: ParticipanteAsociacion };
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
