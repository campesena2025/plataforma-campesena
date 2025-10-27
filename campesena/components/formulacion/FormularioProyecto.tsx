import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, FileText, Users, TrendingUp, Globe } from 'lucide-react';

import { InformacionBasica } from './sections/InformacionBasica';
import { ProblemaJustificacion } from './sections/ProblemaJustificacion';
import { ImpactoSection } from './sections/ImpactoSection';
import { AnalisisContexto } from './sections/AnalisisContexto';

import { ProyectoProductivo, ProyectoProductivoRequest } from '@/types/proyectoProductivo';

interface Props {
  proyecto?: ProyectoProductivo;
  onGuardar: (proyecto: Partial<ProyectoProductivoRequest>) => void;
  onCancelar: () => void;
}

const secciones = [
  { id: 'basica', titulo: 'Información Básica', icon: FileText },
  { id: 'problema', titulo: 'Problema y Justificación', icon: Users },
  { id: 'impacto', titulo: 'Impacto', icon: TrendingUp },
  { id: 'contexto', titulo: 'Análisis de Contexto', icon: Globe },
];

export const FormularioProyecto: React.FC<Props> = ({ proyecto, onGuardar, onCancelar }) => {
  const [seccionActual, setSeccionActual] = useState(0);
  const [formData, setFormData] = useState<Partial<ProyectoProductivoRequest>>(
    proyecto || {
      nombreProyecto: '',
      tiempoEstimado: 12,
      planteamiento: '',
      justificacion: '',
      beneficiarios: '',
      impactoSocial: '',
      impactoEconomico: '',
      impactoAmbiental: '',
      impactoTecnologico: '',
      analisisTendencias: '',
      factoresPoliticos: '',
      factoresEconomicos: '',
      factoresSociales: '',
      factoresTecnologicos: '',
      incertidumbres: '',
      estado: 'Borrador',
    },
  );

  const actualizarFormData = (campo: string, valor: any) => {
    if (campo.includes('.')) {
      const [seccion, subcampo] = campo.split('.');

      setFormData((prev) => {
        const currentSection = prev[seccion as keyof Partial<ProyectoProductivoRequest>];
        const sectionObject = typeof currentSection === 'object' && currentSection !== null 
          ? currentSection as Record<string, any> 
          : {};
          
        return {
          ...prev,
          [seccion]: {
            ...sectionObject,
            [subcampo]: valor,
          },
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [campo]: valor,
      }));
    }
  };

  const siguienteSeccion = () => {
    if (seccionActual < secciones.length - 1) {
      setSeccionActual(seccionActual + 1);
    }
  };

  const seccionAnterior = () => {
    if (seccionActual > 0) {
      setSeccionActual(seccionActual - 1);
    }
  };

  const manejarGuardar = () => {
    debugger;
    console.log('Guardando proyecto:', formData);
    onGuardar(formData);
  };

  const renderSeccionActual = () => {
    switch (seccionActual) {
      case 0:
        return <InformacionBasica data={formData} onChange={actualizarFormData} />;
      case 1:
        return <ProblemaJustificacion data={formData} onChange={actualizarFormData} />;
      case 2:
        return <ImpactoSection data={formData} onChange={actualizarFormData} />;
      case 3:
        return <AnalisisContexto data={formData} onChange={actualizarFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {proyecto ? 'Editar Proyecto' : 'Nuevo Proyecto Productivo'}
          </h1>
          <p className="text-gray-600">Complete la información en cada sección para formular su proyecto productivo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Secciones</h3>
              <nav className="space-y-2">
                {secciones.map((seccion, index) => {
                  const Icon = seccion.icon;
                  const esActual = index === seccionActual;
                  const estaCompleta = index < seccionActual;

                  return (
                    <button
                      key={seccion.id}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        esActual
                          ? 'bg-blue-100 text-blue-700 border-blue-200'
                          : estaCompleta
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setSeccionActual(index)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span className="truncate">{seccion.titulo}</span>
                      {estaCompleta && <div className="ml-auto h-2 w-2 bg-green-500 rounded-full" />}
                    </button>
                  );
                })}
              </nav>

              {/* Barra de progreso */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Progreso</span>
                  <span>{Math.round(((seccionActual + 1) / secciones.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((seccionActual + 1) / secciones.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{secciones[seccionActual].titulo}</h2>
              </div>

              <div className="p-6">{renderSeccionActual()}</div>

              {/* Botones de navegación */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={seccionActual === 0}
                  type="button"
                  onClick={seccionAnterior}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </button>

                <div className="flex space-x-3">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    type="button"
                    onClick={onCancelar}
                  >
                    Cancelar
                  </button>

                  {seccionActual === secciones.length - 1 ? (
                    <button
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      type="button"
                      onClick={manejarGuardar}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Guardar Proyecto
                    </button>
                  ) : (
                    <button
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                      type="button"
                      onClick={siguienteSeccion}
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
