import { Plus } from 'lucide-react';

import { Formacion } from '@/types/formacion';

interface CursoDisponibleItemProps {
  formacion: Formacion;
  handleAsignar: (formacion: Formacion) => void;
}

export function CursoDisponibleItem({ formacion, handleAsignar }: CursoDisponibleItemProps) {
  return (
    <div className="p-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">{formacion.nombre}</h4>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-medium">Codigo Sofia:</span>
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                {formacion.codigoSofia}
              </span>
            </div>
            <div className="flex items-center gap-1 min-w-0">
              <span className="font-medium">Version:</span>
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-mono">
                {formacion.version}
              </span>
            </div>
          </div>
        </div>

        <button
          className="ml-2 flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          onClick={() => handleAsignar(formacion)}
        >
          <Plus className="h-4 w-4" />
          Asignar
        </button>
      </div>
    </div>
  );
}
