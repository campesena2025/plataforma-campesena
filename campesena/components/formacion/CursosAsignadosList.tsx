import { BookOpen, Trash2 } from 'lucide-react';

import { NoCursosAsignados } from './NoCursosAsignados';

import { FormacionAsociacion } from '@/types/formacionAsociacion';

interface CursosAsignadosListProps {
  formaciones?: Array<FormacionAsociacion>;
  setMostrarBusqueda: (value: boolean) => void;
  handleDesasignar: (formacionId: number) => void;
}

export function CursosAsignadosList({
  formaciones = [],
  setMostrarBusqueda,
  handleDesasignar,
}: CursosAsignadosListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-3 border-b">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Formaciones Asignadas
        </h2>
        <p className="text-gray-600 text-xs">{formaciones.length} formaciones</p>
      </div>

      <div className="divide-y">
        {formaciones.map((formacion) => (
          <div key={formacion.id} className="p-3 hover:bg-gray-50 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {'nombreFormacion' in formacion ? formacion.nombreFormacion : 'N/A'}
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  Código: {formacion.codigoSofia}
                </span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-green-800 rounded-full">
                  Numero de ficha: {formacion.numeroFicha ?? 'N/A'}
                </span>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              title="Desasignar formación"
              onClick={() => handleDesasignar(formacion.id)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}

        {formaciones.length === 0 && <NoCursosAsignados setMostrarBusqueda={setMostrarBusqueda} />}
      </div>
    </div>
  );
}
