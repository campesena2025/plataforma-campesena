import { X, Calendar } from 'lucide-react';

import { Formacion } from '@/types/formacion';

interface AsignarCursoModalProps {
  formacion: Formacion | null;
  codigoFicha: string;
  setCodigoFicha: (value: string) => void;
  fecha: string;
  setFecha: (value: string) => void;
  handleConfirmarAsignacion: () => Promise<void>;
  cerrarModal: () => void;
}

export function AsignarCursoModal({
  formacion,
  codigoFicha,
  setCodigoFicha,
  fecha,
  setFecha,
  handleConfirmarAsignacion,
  cerrarModal,
}: AsignarCursoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-base font-semibold text-gray-900">Asignar Curso</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={cerrarModal}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3">
          <div className="mb-3 p-2 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-1 truncate">{formacion?.nombre}</h4>
            <p className="text-xs text-gray-600">
              {formacion?.codigoSofia} - Versión {formacion?.version}
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Código de Ficha de Formación</label>
              <input
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent"
                placeholder="Ej: 2691851"
                type="text"
                value={codigoFicha}
                onChange={(e) => setCodigoFicha(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Fecha de Inicio
              </label>
              <input
                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-transparent"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 p-3 border-t bg-gray-50 rounded-b-lg">
          <button
            className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            onClick={cerrarModal}
          >
            Cancelar
          </button>
          <button
            className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!codigoFicha || !fecha || !formacion}
            onClick={handleConfirmarAsignacion}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
