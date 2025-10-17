'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, FileText, Calendar, User, Edit, Trash2, Eye, Loader } from 'lucide-react';
import { useParams } from 'next/navigation';

import { FormularioProyecto } from './FormularioProyecto';
import { VistaProyecto } from './VistaProyecto';

import {
  getProyectoProductivoByAsociacion,
  createProyectoProductivo,
  updateProyectoProductivo,
  deleteProyectoProductivo,
} from '@/services/formulacion.service';
import { ProyectoProductivo, ProyectoProductivoRequest } from '@/types/proyectoProductivo';

export const Dashboard: React.FC = () => {
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

  const manejarEliminarProyecto = async (id: number) => {
    const asociacionId = Number(params.id);

    if (!asociacionId) return;
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
      try {
        await deleteProyectoProductivo(id);
        fetchProyectos(asociacionId);
      } catch (error: any) {
        setError(error.message);
      }
    }
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Proyectos Productivos</h1>
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

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                <p className="text-2xl font-bold text-gray-900">{proyectos.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {proyectos.filter((p) => p.estado === 'Completado').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Borrador</p>
                <p className="text-2xl font-bold text-gray-900">
                  {proyectos.filter((p) => p.estado === 'Borrador').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Buscar proyectos..."
                  type="text"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="borrador">Borrador</option>
                <option value="completado">Completado</option>
                <option value="en revisión">En Revisión</option>
              </select>
            </div>
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
                <div key={proyecto.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{proyecto.nombreProyecto}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Duración: {proyecto.tiempoEstimado} meses</span>
                        <span>•</span>
                        <span>Creado: {new Date(proyecto.createdAt).toLocaleDateString()}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${obtenerColorEstado(
                            proyecto.estado,
                          )}`}
                        >
                          {obtenerTextoEstado(proyecto.estado)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Ver proyecto"
                        onClick={() => manejarVerProyecto(proyecto)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Editar proyecto"
                        onClick={() => manejarEditarProyecto(proyecto)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Eliminar proyecto"
                        onClick={() => manejarEliminarProyecto(proyecto.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
