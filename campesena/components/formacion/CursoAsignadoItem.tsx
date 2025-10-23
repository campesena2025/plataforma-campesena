import { Calendar, FileText, MapPin } from 'lucide-react';

import { CursoAsignado } from './types';

interface CursoAsignadoItemProps {
  cursoAsignado: CursoAsignado;
}

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-800';
    case 'programado':
      return 'bg-blue-100 text-blue-800';
    case 'finalizado':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getEstadoTexto = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'En Curso';
    case 'programado':
      return 'Programado';
    case 'finalizado':
      return 'Finalizado';
    default:
      return estado;
  }
};

export function CursoAsignadoItem({ cursoAsignado }: CursoAsignadoItemProps) {
  return (
    <div className="p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">{cursoAsignado.curso.nombreDiseno}</h3>
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(cursoAsignado.estado)}`}>
              {getEstadoTexto(cursoAsignado.estado)}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-gray-600 mb-1">
            <div className="flex items-center gap-1 min-w-0">
              <FileText className="h-3 w-3 flex-shrink-0" />
              <span className="font-medium">Ficha:</span>
              <span className="font-mono truncate">{cursoAsignado.codigoFicha}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="font-medium">Inicio:</span>
              <span className="truncate">{new Date(cursoAsignado.fechaInicio).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="font-medium">Regional:</span>
              <span className="truncate">{cursoAsignado.regional}</span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-medium">Código:</span>
              <span className="px-1 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono truncate">
                {cursoAsignado.curso.codigoDiseno}
              </span>
            </div>
          </div>

          <div className="text-xs text-gray-500 truncate">
            <span className="font-medium">Centro:</span> {cursoAsignado.centro}
          </div>
        </div>
      </div>
    </div>
  );
}
