import { Municipio } from './municipio';
import { Asociacion } from './asociacion';
import { ServicioParticipante } from './servicioParticipante';
import { User } from './user';
import { Pagination } from './pagination';

export interface VeredaRequest {
  divipola: string;
  nombre: string;
  municipio?: number | string;
  asociacion?: number | string;
  servicio_participante?: number | string;
  locale?: string;
}

export interface Vereda {
  id: number;
  documentId: string;
  divipola: string;
  nombre: string;
  municipio: { data: Municipio };
  asociacion: { data: Asociacion };
  servicio_participante: { data: ServicioParticipante };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: Vereda[] };
}

export interface Veredas {
  data: Vereda[];
  meta: {
    pagination: Pagination;
  };
}
