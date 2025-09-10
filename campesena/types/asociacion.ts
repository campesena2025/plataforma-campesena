import { getSession } from "@/services/auth";
import { Departamento } from "./departamento";
import { Media } from "./media";
import { Municipio } from "./municipio";
import { Pagination } from "./pagination";
import { Participante } from "./participante";
import { User } from "./user";
import { Vereda } from "./vereda";

export interface AsociacionRequest {
  nit: string;
  nombreAsociacion: string;
  formalizada: boolean;
  departamento: number | string;
  municipio: number | string;
  vereda: number | string | null;
  tipoOrganizacion: string;
  codigoInterno?: string;
  sector: string;
  razonCreacion?: string;
  productoServicio: string;
  codigoCIUU?: string;
  evaluacion_diagnosticos?: (number | string)[];
  locale?: string;
  foto?: number | string;
  localizations?: (number | string)[];
  observaciones?: string;
  representanteLegal?: number | string;
  participantes?: (number | string)[];
  estado: string;
  warning?: boolean;
  users_permissions_user: number | string;
}

export interface Asociaciones {
  data: Asociacion[];
  meta: {
    pagination: Pagination;
  };
}

export interface Asociacion {
  id: number;
  documentId: string;
  nit: string;
  nombreAsociacion: string;
  formalizada: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tipoOrganizacion: string;
  codigoInterno: string;
  sector: string;
  razonCreacion: string;
  productoServicio: string;
  codigoCIUU: string;
  observaciones: string;
  representanteLegal: Participante | null;
  participantes: Participante[];
  foto: Media;
  departamento: Departamento;
  municipio: Municipio;
  vereda: Vereda;
  estado: string;
  warning?: boolean;
  users_permissions_user: User;
}

export const toAsociacionRequest = (
  asociacion: Asociacion,
): AsociacionRequest => ({
  nit: asociacion.nit,
  nombreAsociacion: asociacion.nombreAsociacion,
  formalizada: asociacion.formalizada,
  departamento: asociacion.departamento?.id,
  municipio: asociacion.municipio?.id,
  vereda: asociacion.vereda?.id,
  tipoOrganizacion: asociacion.tipoOrganizacion,
  codigoInterno: asociacion.codigoInterno,
  sector: asociacion.sector,
  razonCreacion: asociacion.razonCreacion,
  productoServicio: asociacion.productoServicio,
  codigoCIUU: asociacion.codigoCIUU,
  observaciones: asociacion.observaciones,
  estado: asociacion.estado,
  warning: asociacion.warning,
  representanteLegal: asociacion.representanteLegal?.id,
  participantes: asociacion.participantes?.map((p) => p.id) ?? [],
  foto: asociacion.foto?.id,
  users_permissions_user: getSession()?.user.id ?? 0,
});
