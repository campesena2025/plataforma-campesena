import { X, AlertCircle } from 'lucide-react';

interface AlertaModalProps {
  mensaje: string;
  onAceptar: () => void;
}

export function AlertaModal({ mensaje, onAceptar }: AlertaModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-green-500" />
            Alerta
          </h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onAceptar}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-700">{mensaje}</p>
        </div>

        <div className="flex gap-2 p-3 border-t bg-gray-50 rounded-b-lg">
          <button
            className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            onClick={onAceptar}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
