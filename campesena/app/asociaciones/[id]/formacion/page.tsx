'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { AsignarCursoModal } from '@/components/formacion/AsignarCursoModal';
import { BusquedaCursos } from '@/components/formacion/BusquedaCursos';
import { CursosAsignadosList } from '@/components/formacion/CursosAsignadosList';
import { CursosDisponiblesList } from '@/components/formacion/CursosDisponiblesList';
import { Header } from '@/components/formacion/Header';
import { Formacion } from '@/types/formacion';
import { getFormacionesDisponibles, getFormacionesInscritas, inscribirFormacion } from '@/services/formacion.service';

export default function FormacionPage() {
  const params = useParams();
  const asociacionId = params.id as string;

  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formacionesDisponibles, setFormacionesDisponibles] = useState<Formacion[]>([]);
  const [formacionesInscritas, setFormacionesInscritas] = useState<Formacion[]>([]);
  const [formacionSeleccionada, setFormacionSeleccionada] = useState<Formacion | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [codigoFicha, setCodigoFicha] = useState('');
  const [fecha, setFecha] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const cargarFormaciones = async () => {
      try {
        const disponibles = await getFormacionesDisponibles(searchTerm, page, pageSize, 'nombre:asc');

        setFormacionesDisponibles(disponibles.data);
        setTotalPages(disponibles.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error al cargar formaciones:', error);
      }
    };

    cargarFormaciones();
  }, [searchTerm, page, pageSize]);

  useEffect(() => {
    const cargarInscritas = async () => {
      const inscritas = await getFormacionesInscritas(asociacionId);

      setFormacionesInscritas(inscritas.data);
    };

    cargarInscritas();
  }, [asociacionId]);

  const formacionesFiltradas = formacionesDisponibles.filter(
    (formacion) =>
      formacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.codigoSofia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formacion.version.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAsignar = (formacion: Formacion) => {
    setFormacionSeleccionada(formacion);
    setModalAbierto(true);
  };

  const handleConfirmarAsignacion = async () => {
    if (codigoFicha && fecha && formacionSeleccionada) {
      try {
        const nuevaFormacion = await inscribirFormacion(asociacionId, {
          ...formacionSeleccionada,
          fechaInicio: fecha,
          estado: true,
        });

        setFormacionesInscritas([...formacionesInscritas, nuevaFormacion]);
        setModalAbierto(false);
        setCodigoFicha('');
        setFecha('');
        setMostrarBusqueda(false);
        setFormacionSeleccionada(null);
        setSearchTerm('');
      } catch (error) {
        console.error('Error al inscribir formación:', error);
      }
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCodigoFicha('');
    setFecha('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-5xl mx-auto">
        <Header mostrarBusqueda={mostrarBusqueda} setMostrarBusqueda={setMostrarBusqueda} />

        {!mostrarBusqueda && (
          <CursosAsignadosList formaciones={formacionesInscritas} setMostrarBusqueda={setMostrarBusqueda} />
        )}

        {mostrarBusqueda && (
          <>
            <BusquedaCursos
              searchTerm={searchTerm}
              setMostrarBusqueda={setMostrarBusqueda}
              setSearchTerm={setSearchTerm}
              onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                  const disponibles = await getFormacionesDisponibles(searchTerm, page, pageSize, 'nombre:asc');

                  setFormacionesDisponibles(disponibles.data);
                  setTotalPages(disponibles.meta.pagination.pageCount);
                }
              }}
              onSearch={() => {
                setSearchTerm(searchTerm);
              }}
            />

            <CursosDisponiblesList formaciones={formacionesDisponibles} handleAsignar={handleAsignar} />

            {/* Controles de paginación */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </button>
              <select
                className="ml-4 border rounded px-2 py-1"
                value={pageSize}
                onChange={(e) => setPage(Number(e.target.value))}
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size} por página
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      {modalAbierto && (
        <AsignarCursoModal
          cerrarModal={cerrarModal}
          codigoFicha={''}
          fecha={fecha}
          formacion={formacionSeleccionada}
          handleConfirmarAsignacion={handleConfirmarAsignacion}
          setCodigoFicha={setCodigoFicha}
          setFecha={setFecha}
        />
      )}
    </div>
  );
}
