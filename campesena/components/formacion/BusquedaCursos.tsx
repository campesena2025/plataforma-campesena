import { Search, X } from 'lucide-react';

interface BusquedaCursosProps {
  setMostrarBusqueda: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

export function BusquedaCursos({
  setMostrarBusqueda,
  searchTerm,
  setSearchTerm,
  onKeyDown,
  onSearch,
}: BusquedaCursosProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <Search className="h-5 w-5" />
          Buscar Formaciones
        </h2>
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => setMostrarBusqueda(false)}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="w-full">
        <div className="relative flex">
          <input
            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent"
            placeholder="Buscar por nombre del curso o código de diseño..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <button
            className="bg-green-500 hover:bg-green-600 ml-2 px-3 py-1 rounded-md text-white"
            type="button"
            onClick={onSearch}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
