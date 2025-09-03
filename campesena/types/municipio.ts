import { Departamento } from "./departamento";
import { Vereda } from "./vereda";
import { Asociacion } from "./asociacion";
import { ServicioParticipante } from "./servicioParticipante";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface MunicipioRequest {
  divipola: string;
  nombre: string;
  departamento?: number | string;
  veredas?: (number | string)[];
  asociacion?: number | string;
  zomac: boolean;
  ruralidad: "Rural" | "Urbano";
  restitucionTierras: boolean;
  zonaReformaRural: "No ZNRA" | "ZNRA";
  servicio_participante?: number | string;
  zonaReservaCampesina: string;
  subregionPDET: string;
  mape: string;
  latitud: string;
  longitud: string;
  locale?: string;
}

export interface Municipio {
  id: number;
  documentId: string;
  divipola: string;
  nombre: string;
  departamento: { data: Departamento };
  veredas: { data: Vereda[] };
  asociacion: { data: Asociacion };
  zomac: boolean;
  ruralidad: "Rural" | "Urbano";
  restitucionTierras: boolean;
  zonaReformaRural: "No ZNRA" | "ZNRA";
  servicio_participante: { data: ServicioParticipante };
  zonaReservaCampesina: string;
  subregionPDET: string;
  mape: string;
  latitud: string;
  longitud: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Municipio[] };
}

export interface Municipios {
  data: Municipio[];
  meta: {
    pagination: Pagination;
  };
}