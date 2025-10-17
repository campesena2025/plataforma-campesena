import { User } from './user';
import { Pagination } from './pagination';

export interface ProyectoProductivoRequest {
  nombreProyecto: string;
  tiempoEstimado: number;
  planteamiento: string;
  justificacion: string;
  beneficiarios: string;
  impactoSocial: string;
  impactoEconomico: string;
  impactoAmbiental: string;
  impactoTecnologico: string;
  analisisTendencias: string;
  factoresPoliticos: string;
  factoresEconomicos: string;
  factoresSociales: string;
  factoresTecnologicos: string;
  incertidumbres: string;
  estado: 'Borrador' | 'Completado' | 'En Revisión';
  fechaCreacion: string;
  asociacion: string | number;
  locale?: string;
}

export interface ProyectoProductivo {
  id: number;
  documentId: string;
  nombreProyecto: string;
  tiempoEstimado: number;
  Planteamiento: string;
  justificacion: string;
  beneficiarios: string;
  impactoSocial: string;
  impactoEconomico: string;
  impactoAmbiental: string;
  impactoTecnologico: string;
  analisisTendencias: string;
  factoresPoliticos: string;
  factoresEconomicos: string;
  factoresSociales: string;
  factoresTecnologicos: string;
  incertidumbres: string;
  estado: 'Borrador' | 'Completado' | 'En Revisión';
  fechaCreacion: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: { data: User | null };
  updatedBy: { data: User | null };
  locale: string;
  localizations: { data: ProyectoProductivo[] };
}

export interface ProyectoProductivos {
  data: ProyectoProductivo[];
  meta: {
    pagination: Pagination;
  };
}
