import React from 'react';
import { ProyectoProductivoRequest } from '@/types/proyectoProductivo';

interface Props {
  data: Partial<ProyectoProductivoRequest>;
  onChange: (campo: string, valor: any) => void;
}

export const ProblemaJustificacion: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="problema" className="block text-sm font-medium text-gray-700 mb-2">
          Planteamiento del Problema *
        </label>
        <textarea
          id="problema"
          rows={6}
          value={data.planteamiento}
          onChange={(e) => onChange('planteamiento', e.target.value)}
          placeholder="Describa claramente el problema que busca resolver con este proyecto..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 text-sm text-gray-500">
          Incluya: situación actual, causas del problema y consecuencias
        </div>
      </div>

      <div>
        <label htmlFor="justificacion" className="block text-sm font-medium text-gray-700 mb-2">
          Justificación *
        </label>
        <textarea
          id="justificacion"
          rows={6}
          value={data.justificacion}
          onChange={(e) => onChange('justificacion', e.target.value)}
          placeholder="Explique por qué es importante desarrollar este proyecto..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 text-sm text-gray-500">
          Incluya: relevancia, oportunidad y viabilidad del proyecto
        </div>
      </div>

      <div>
        <label htmlFor="beneficiarios" className="block text-sm font-medium text-gray-700 mb-2">
          Beneficiarios *
        </label>
        <textarea
          id="beneficiarios"
          rows={4}
          value={data.beneficiarios}
          onChange={(e) => onChange('beneficiarios', e.target.value)}
          placeholder="Identifique quiénes se beneficiarán directa e indirectamente del proyecto..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2 text-sm text-gray-500">
          Especifique: beneficiarios directos, indirectos y cantidad estimada
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-md p-4">
        <h4 className="font-medium text-green-900 mb-2">Resumen de la Propuesta</h4>
        <div className="text-sm text-green-800 space-y-2">
          <p><strong>Problema identificado:</strong> {data.planteamiento ? '✓ Definido' : '⚠ Pendiente'}</p>
          <p><strong>Justificación:</strong> {data.justificacion ? '✓ Completada' : '⚠ Pendiente'}</p>
          <p><strong>Beneficiarios:</strong> {data.beneficiarios ? '✓ Identificados' : '⚠ Pendiente'}</p>
        </div>
      </div>
    </div>
  );
};