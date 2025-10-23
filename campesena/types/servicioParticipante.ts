import { Municipio } from './municipio';
import { Vereda } from './vereda';
import { CentroFormacion } from './centroFormacion';
import { Formacion } from './formacion';
import { ParticipanteAsociacion } from './participanteAsociacion';
import { ProyectoProductivo } from './proyectoProductivo';
import { User } from './user';
import { Pagination } from './pagination';

export interface ServicioParticipanteRequest {
  fechaInicio: string;
  numeroFicha: string;
  municipio?: number | string;
  vereda?: number | string;
  centro_formacion?: number | string;
  formacion?: number | string;
  participante_asociacion?: number | string;
  proyecto_productivo?: number | string;
  locale?: string;
}

export interface ServicioParticipante {
  id: number;
  documentId: string;
  fechaInicio: string;
  numeroFicha: string;
  municipio: { data: Municipio };
  vereda: { data: Vereda };
  centro_formacion: { data: CentroFormacion };
  formacion: { data: Formacion };
  participante_asociacion: { data: ParticipanteAsociacion };
  proyecto_productivo: { data: ProyectoProductivo };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ServicioParticipante[] };
}

export interface ServicioParticipantes {
  data: ServicioParticipante[];
  meta: {
    pagination: Pagination;
  };
}
