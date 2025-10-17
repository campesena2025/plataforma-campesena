import React from 'react';

import { ProyectoProductivoRequest } from '@/types/proyectoProductivo';

interface Props {
  data: Partial<ProyectoProductivoRequest>;
  onChange: (campo: string, valor: any) => void;
}

export const InformacionBasica: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
          Nombre del Proyecto *
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          id="nombre"
          placeholder="Ingrese el nombre del proyecto"
          type="text"
          value={data.nombreProyecto || ''}
          onChange={(e) => onChange('nombreProyecto', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tiempo">
          Tiempo Estimado de Ejecución (meses) *
        </label>
        <div className="relative">
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="tiempo"
            max="60"
            min="1"
            type="number"
            value={data.tiempoEstimado || 0}
            onChange={(e) => onChange('tiempoEstimado', parseInt(e.target.value))}
          />
          <div className="mt-2 text-sm text-gray-500">Rango recomendado: 6 a 24 meses</div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="font-medium text-blue-900 mb-2">Información del Proyecto</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>
            <strong>Nombre:</strong> {data.nombreProyecto || 'Sin especificar'}
          </p>
          <p>
            <strong>Duración:</strong> {data.tiempoEstimado} meses
          </p>
        </div>
      </div>
    </div>
  );
};
