import React from 'react';
import { ArrowLeft, CreditCard as Edit, Calendar, Clock, Users, TrendingUp, Globe, FileText } from 'lucide-react';

import { ProyectoProductivo } from '@/types/proyectoProductivo';

interface Props {
  proyecto: ProyectoProductivo;
  onEditar: () => void;
  onVolver: () => void;
}

export const VistaProyecto: React.FC<Props> = ({ proyecto, onEditar, onVolver }) => {
  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en_revision':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const obtenerTextoEstado = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'Completado';
      case 'en_revision':
        return 'En Revisión';
      default:
        return 'Borrador';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" onClick={onVolver}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{proyecto.nombreProyecto}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${obtenerColorEstado(proyecto.estado)}`}
                  >
                    {obtenerTextoEstado(proyecto.estado)}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(proyecto.fechaCreacion).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {proyecto.tiempoEstimado} meses
                  </span>
                </div>
              </div>
            </div>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={onEditar}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Información básica */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Información Básica
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Duración</p>
                  <p className="text-gray-900">{proyecto.tiempoEstimado} meses</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Estado</p>
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(proyecto.estado)}`}
                  >
                    {obtenerTextoEstado(proyecto.estado)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problema y Justificación */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Problema y Justificación
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Planteamiento del Problema</h4>
                  <p className="text-gray-700 leading-relaxed">{proyecto.Planteamiento}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Justificación</h4>
                  <p className="text-gray-700 leading-relaxed">{proyecto.justificacion}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Beneficiarios</h4>
                  <p className="text-gray-700 leading-relaxed">{proyecto.beneficiarios}</p>
                </div>
              </div>
            </div>

            {/* Impacto */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Análisis de Impacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Impacto Social</h4>
                  <p className="text-blue-800 text-sm leading-relaxed">{proyecto.impactoSocial}</p>
                </div>
                <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Impacto Económico</h4>
                  <p className="text-green-800 text-sm leading-relaxed">{proyecto.impactoEconomico}</p>
                </div>
                <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-medium text-emerald-900 mb-2">Impacto Ambiental</h4>
                  <p className="text-emerald-800 text-sm leading-relaxed">{proyecto.impactoAmbiental}</p>
                </div>
                <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Impacto Tecnológico</h4>
                  <p className="text-purple-800 text-sm leading-relaxed">{proyecto.impactoTecnologico}</p>
                </div>
              </div>
            </div>

            {/* Análisis de Contexto */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-orange-600" />
                Análisis de Contexto
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Análisis Tendencias</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{proyecto.analisisTendencias}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Factores Políticos</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{proyecto.factoresPoliticos}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Factores Económicos</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{proyecto.factoresEconomicos}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Factores Sociales</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{proyecto.factoresSociales}</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Factores Tecnológicos</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{proyecto.factoresTecnologicos}</p>
                  </div>
                </div>
                <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Incertidumbre y Riesgos</h4>
                  <p className="text-yellow-800 text-sm leading-relaxed">{proyecto.incertidumbres}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
