import { GraduationCap } from 'lucide-react';

export function NoCursosDisponibles() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
      <GraduationCap className="h-8 w-8 text-gray-400 mx-auto mb-2" />
      <h3 className="text-base font-medium text-gray-900 mb-1">No hay formaciones disponibles</h3>
      <p className="text-gray-600 text-sm">Todos las formaciones ya están asignados.</p>
    </div>
  );
}
