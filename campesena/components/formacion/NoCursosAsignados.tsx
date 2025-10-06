import { BookOpen, Search } from 'lucide-react';

interface NoCursosAsignadosProps {
  setMostrarBusqueda: (value: boolean) => void;
}

export function NoCursosAsignados({ setMostrarBusqueda }: NoCursosAsignadosProps) {
  return (
    <div className="p-8 text-center">
      <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
      <h3 className="text-base font-medium text-gray-900 mb-1">No tienes formaciones asignadas</h3>
      <p className="text-gray-600 mb-3 text-sm">Comienza buscando programas de formación</p>
      <button
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
        onClick={() => setMostrarBusqueda(true)}
      >
        <Search className="h-4 w-4" />
        Buscar Formaciones
      </button>
    </div>
  );
}
