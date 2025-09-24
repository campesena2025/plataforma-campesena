import { Asociacion } from "./asociacion";
import { User } from "./user";

export interface ParticipanteRequest {
  documentId: string;
  numeroDocumento: string;
  nombreCompleto: string;
  genero: "Masculino" | "Femenino" | "No Binario";
  correoElectronico: string;
  numeroContacto: number;
  asociacions: number[] | string[] | null;
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

export const toParticipanteRequest = (
  participante: Participante | null,
): ParticipanteRequest => {
  if (!participante) {
    return {
      documentId: "",
      numeroDocumento: "",
      nombreCompleto: "",
      genero: "No Binario",
      correoElectronico: "",
      numeroContacto: 0,
      asociacions: null,
      tipoPoblacion: "GENERAL",
      edad: 0,
      nivelEstudio: "Ninguno",
      locale: "es-CO",
    };
  }

  return {
    documentId: participante.documentId,
    numeroDocumento: participante.numeroDocumento ?? "",
    nombreCompleto: participante.nombreCompleto,
    genero: participante.genero,
    correoElectronico: participante.correoElectronico,
    numeroContacto: participante.numeroContacto,
    asociacions: participante.asociacions?.map((a) => a.id) ?? null,
    tipoPoblacion: participante.tipoPoblacion,
    edad: participante.edad,
    nivelEstudio: participante.nivelEstudio,
    locale: participante.locale,
  };
};
