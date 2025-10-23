import { X, AlertTriangle } from 'lucide-react';

interface ConfirmacionModalProps {
  mensaje: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmacionModal({ mensaje, onConfirmar, onCancelar }: ConfirmacionModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Confirmación
          </h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onCancelar}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-700">{mensaje}</p>
        </div>

        <div className="flex gap-2 p-3 border-t bg-gray-50 rounded-b-lg">
          <button
            className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
            onClick={onConfirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
