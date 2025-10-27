'use client';
import React, { useState, useEffect } from 'react';
import { Plus, FileText, Loader } from 'lucide-react';
import { useParams } from 'next/navigation';

import { FormularioProyecto } from './FormularioProyecto';
import { VistaProyecto } from './VistaProyecto';
import { CardProyectoProductivo } from './CardProyectoProductivo';

import {
  getProyectoProductivoByAsociacion,
  createProyectoProductivo,
  updateProyectoProductivo,
} from '@/services/formulacion.service';
import { ProyectoProductivo, ProyectoProductivoRequest } from '@/types/proyectoProductivo';

export const ProyectosProductivosList: React.FC = () => {
  const [proyectos, setProyectos] = useState<ProyectoProductivo[]>([]);
  const [vistaActual, setVistaActual] = useState<'lista' | 'formulario' | 'detalle'>('lista');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<ProyectoProductivo | undefined>();
  const [filtro, setFiltro] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const fetchProyectos = async (asociacionId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProyectoProductivoByAsociacion(asociacionId);

      setProyectos(data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const asociacionId = params.id?.toString();

    if (asociacionId) {
      fetchProyectos(asociacionId);
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const manejarGuardarProyecto = async (proyecto: Partial<ProyectoProductivoRequest>) => {
    console.log('Recibido para guardar:', proyecto);
    const asociacionId = params.id?.toString();

    if (!asociacionId) {
      console.error('No se encontró el ID de la asociación');

      return;
    }
    try {
      if (proyectoSeleccionado) {
        console.log('Actualizando proyecto');
        await updateProyectoProductivo(proyectoSeleccionado.documentId, proyecto);
      } else {
        console.log('Creando nuevo proyecto');
        await createProyectoProductivo({ ...proyecto, asociacion: asociacionId } as ProyectoProductivoRequest);
      }
      fetchProyectos(asociacionId);
      setVistaActual('lista');
      setProyectoSeleccionado(undefined);
    } catch (error: any) {
      console.error('Error al guardar el proyecto:', error);
      setError(error.message);
    }
  };

  const manejarEditarProyecto = (proyecto: ProyectoProductivo) => {
    setProyectoSeleccionado(proyecto);
    setVistaActual('formulario');
  };

  const manejarVerProyecto = (proyecto: ProyectoProductivo) => {
    setProyectoSeleccionado(proyecto);
    setVistaActual('detalle');
  };

  const proyectosFiltrados = proyectos.filter((proyecto) => {
    const coincideNombre = proyecto.nombreProyecto.toLowerCase().includes(filtro.toLowerCase());
    const coincideEstado = filtroEstado === 'todos' || proyecto.estado.toLowerCase() === filtroEstado;

    return coincideNombre && coincideEstado;
  });

  const obtenerColorEstado = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'en revisión':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const obtenerTextoEstado = (estado: string) => {
    return estado.charAt(0).toUpperCase() + estado.slice(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (vistaActual === 'formulario') {
    return (
      <FormularioProyecto
        proyecto={proyectoSeleccionado}
        onCancelar={() => {
          setVistaActual('lista');
          setProyectoSeleccionado(undefined);
        }}
        onGuardar={manejarGuardarProyecto}
      />
    );
  }

  if (vistaActual === 'detalle' && proyectoSeleccionado) {
    return (
      <VistaProyecto
        proyecto={proyectoSeleccionado}
        onEditar={() => manejarEditarProyecto(proyectoSeleccionado)}
        onVolver={() => setVistaActual('lista')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Proyectos Productivos</h1>
              <p className="text-gray-600">Gestione y formule sus proyectos productivos de manera integral</p>
            </div>
            <button
              className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                setProyectoSeleccionado(undefined);
                setVistaActual('formulario');
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </button>
          </div>
        </div>

        {/* Lista de proyectos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {proyectosFiltrados.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos</h3>
              <p className="text-gray-600 mb-4">
                {filtro || filtroEstado !== 'todos'
                  ? 'No se encontraron proyectos con los filtros aplicados'
                  : 'Comience creando su primer proyecto productivo'}
              </p>
              {!filtro && filtroEstado === 'todos' && (
                <button
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    setProyectoSeleccionado(undefined);
                    setVistaActual('formulario');
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Proyecto
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {proyectosFiltrados.map((proyecto) => (
                <CardProyectoProductivo
                  key={proyecto.id}
                  obtenerColorEstado={obtenerColorEstado}
                  obtenerTextoEstado={obtenerTextoEstado}
                  proyecto={proyecto}
                  onEditar={manejarEditarProyecto}
                  onVer={manejarVerProyecto}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
