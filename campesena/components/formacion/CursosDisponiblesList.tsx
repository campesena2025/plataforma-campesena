import { CursoDisponibleItem } from './CursoDisponibleItem';
import { NoCursosDisponibles } from './NoCursosDisponibles';

import { Formacion } from '@/types/formacion';

interface CursosDisponiblesListProps {
  formaciones: Formacion[];
  handleAsignar: (formacion: Formacion) => void;
}

export function CursosDisponiblesList({ formaciones, handleAsignar }: CursosDisponiblesListProps) {
  if (formaciones.length > 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-3 border-b">
          <h3 className="text-base font-semibold text-gray-900">Formaciones Disponibles</h3>
          <p className="text-gray-600 text-xs">{formaciones.length} Formaciones disponibles</p>
        </div>

        <div className="divide-y">
          {formaciones.map((formacion) => (
            <CursoDisponibleItem key={formacion.id} formacion={formacion} handleAsignar={handleAsignar} />
          ))}
        </div>
      </div>
    );
  }

  return formaciones.length === 0 ? <NoCursosDisponibles /> : null;
}
