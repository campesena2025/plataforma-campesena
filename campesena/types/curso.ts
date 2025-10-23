export interface Curso {
  id: string;
  nombreDiseno: string;
  version: string;
  codigoDiseno: string;
  estado?: string;
}

export interface CursoAsignado {
  id: string;
  curso: Curso;
  codigoFicha: string;
  fechaInicio: string;
  estado: 'programado' | 'activo' | 'finalizado';
}
