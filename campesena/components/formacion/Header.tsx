import { GraduationCap, Search } from 'lucide-react';

interface HeaderProps {
  mostrarBusqueda: boolean;
  setMostrarBusqueda: (value: boolean) => void;
}

export function Header({ mostrarBusqueda, setMostrarBusqueda }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-6 w-6 text-green-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900">Gestión de la formación</h1>
            <p className="text-gray-600 text-xs">Programas de formación</p>
          </div>
        </div>

        {!mostrarBusqueda && (
          <button
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            onClick={() => setMostrarBusqueda(true)}
          >
            <Search className="h-4 w-4" />
            Buscar Formaciones
          </button>
        )}
      </div>
    </div>
  );
}
