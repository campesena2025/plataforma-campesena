import { Participante } from "./participante";
import { Asociacion } from "./asociacion";
import { ServicioParticipante } from "./servicioParticipante";
import { User } from "./user";
import { Pagination } from "./pagination";

export interface ParticipanteAsociacionRequest {
  participante?: number | string;
  asociacion?: number | string;
  rolAsociacion: string;
  ingresosMensuales: number;
  servicio_participantes?: (number | string)[];
  tiempoAsociacion: number;
  conocimientoTecnico: boolean;
  habilidadesGerenciales: boolean;
  temasInteres: string;
  locale?: string;
}

export interface ParticipanteAsociacion {
  id: number;
  documentId: string;
  participante: { data: Participante };
  asociacion: { data: Asociacion };
  rolAsociacion: string;
  ingresosMensuales: number;
  servicio_participantes: { data: ServicioParticipante[] };
  tiempoAsociacion: number;
  conocimientoTecnico: boolean;
  habilidadesGerenciales: boolean;
  temasInteres: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ParticipanteAsociacion[] };
}

export interface ParticipanteAsociacions {
  data: ParticipanteAsociacion[];
  meta: {
    pagination: Pagination;
  };
}
