import React from 'react';
import { Users, DollarSign, Leaf, Cpu } from 'lucide-react';

import { ProyectoProductivoRequest } from '@/types/proyectoProductivo';

interface Props {
  data: Partial<ProyectoProductivoRequest>;
  onChange: (campo: string, valor: any) => void;
}

const impactos = [
  {
    key: 'impactoSocial',
    titulo: 'Impacto Social',
    icon: Users,
    color: 'blue',
    placeholder: 'Describa cómo el proyecto beneficiará a la comunidad y la sociedad...',
  },
  {
    key: 'impactoEconomico',
    titulo: 'Impacto Económico',
    icon: DollarSign,
    color: 'green',
    placeholder: 'Explique los beneficios económicos esperados del proyecto...',
  },
  {
    key: 'impactoAmbiental',
    titulo: 'Impacto Ambiental',
    icon: Leaf,
    color: 'emerald',
    placeholder: 'Indique cómo el proyecto afectará el medio ambiente...',
  },
  {
    key: 'impactoTecnologico',
    titulo: 'Impacto Tecnológico',
    icon: Cpu,
    color: 'purple',
    placeholder: 'Describa la innovación tecnológica que aporta el proyecto...',
  },
];

export const ImpactoSection: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Evaluación de Impactos</h3>
        <p className="text-gray-600">Analice el impacto esperado del proyecto en diferentes dimensiones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impactos.map((impacto) => {
          const Icon = impacto.icon;
          const colorClasses = {
            blue: 'border-blue-200 bg-blue-50',
            green: 'border-green-200 bg-green-50',
            emerald: 'border-emerald-200 bg-emerald-50',
            purple: 'border-purple-200 bg-purple-50',
          };

          return (
            <div
              key={impacto.key}
              className={`border rounded-lg p-4 ${colorClasses[impacto.color as keyof typeof colorClasses]}`}
            >
              <div className="flex items-center mb-3">
                <Icon className="h-5 w-5 text-gray-700 mr-2" />
                <h4 className="font-medium text-gray-900">{impacto.titulo}</h4>
              </div>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder={impacto.placeholder}
                rows={4}
                value={data[impacto.key as keyof ProyectoProductivoRequest]}
                onChange={(e) => onChange(impacto.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
        <h4 className="font-medium text-orange-900 mb-2">Estado del Análisis de Impacto</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {impactos.map((impacto) => (
            <div key={impacto.key} className="flex items-center">
              <div
                className={`h-3 w-3 rounded-full mr-2 ${data[impacto.key as keyof ProyectoProductivoRequest] ? 'bg-green-500' : 'bg-gray-300'
                  }`}
              />
              <span className="text-orange-800">{impacto.titulo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
