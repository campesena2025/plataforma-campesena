import React from 'react';
import { TrendingUp, Building, DollarSign, Users, Cpu, AlertTriangle } from 'lucide-react';

import { ProyectoProductivoRequest } from '@/types/proyectoProductivo';

interface Props {
  data: Partial<ProyectoProductivoRequest>;
  onChange: (campo: string, valor: any) => void;
}

const factores = [
  {
    key: 'analisisTendencias',
    titulo: 'Tendencias',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-700',
    placeholder: 'Identifique las tendencias relevantes del mercado y sector...',
  },
  {
    key: 'factoresPoliticos',
    titulo: 'Factores Políticos',
    icon: Building,
    color: 'bg-red-100 text-red-700',
    placeholder: 'Analice la situación política y normativa que afecta el proyecto...',
  },
  {
    key: 'factoresEconomicos',
    titulo: 'Factores Económicos',
    icon: DollarSign,
    color: 'bg-green-100 text-green-700',
    placeholder: 'Evalúe las condiciones económicas actuales y proyectadas...',
  },
  {
    key: 'factoresSociales',
    titulo: 'Factores Sociales',
    icon: Users,
    color: 'bg-purple-100 text-purple-700',
    placeholder: 'Considere los aspectos sociales y culturales relevantes...',
  },
  {
    key: 'factoresTecnologicos',
    titulo: 'Factores Tecnológicos',
    icon: Cpu,
    color: 'bg-indigo-100 text-indigo-700',
    placeholder: 'Analice los avances tecnológicos y su impacto...',
  },
  {
    key: 'incertidumbres',
    titulo: 'Incertidumbre',
    icon: AlertTriangle,
    color: 'bg-yellow-100 text-yellow-700',
    placeholder: 'Identifique los riesgos e incertidumbres del proyecto...',
  },
];

export const AnalisisContexto: React.FC<Props> = ({ data, onChange }) => {
  const progreso = factores.filter((factor) => data[factor.key as keyof ProyectoProductivoRequest]).length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Análisis de Contexto</h3>
        <p className="text-gray-600">Evalúe el entorno en el que se desarrollará el proyecto</p>
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(progreso / factores.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {progreso} de {factores.length} factores completados
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {factores.map((factor) => {
          const Icon = factor.icon;

          return (
            <div key={factor.key} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-full ${factor.color} mr-3`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="font-medium text-gray-900">{factor.titulo}</h4>
              </div>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={factor.placeholder}
                rows={4}
                value={data[factor.key as keyof ProyectoProductivoRequest]}
                onChange={(e) => onChange(factor.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
        <h4 className="font-medium text-slate-900 mb-3">Resumen del Análisis</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {factores.map((factor) => {
            const completado = data[factor.key as keyof ProyectoProductivoRequest];

            return (
              <div key={factor.key} className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-3 ${completado ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-slate-700">{factor.titulo}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
