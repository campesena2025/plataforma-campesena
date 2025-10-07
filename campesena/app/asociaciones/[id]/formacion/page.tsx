'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { AlertaModal } from '@/components/formacion/AlertaModal';
import { AsignarCursoModal } from '@/components/formacion/AsignarCursoModal';
import { BusquedaCursos } from '@/components/formacion/BusquedaCursos';
import { CursosAsignadosList } from '@/components/formacion/CursosAsignadosList';
import { CursosDisponiblesList } from '@/components/formacion/CursosDisponiblesList';
import { Header } from '@/components/formacion/Header';
import { Formacion } from '@/types/formacion';
import {
  desasignarFormacionAsociacion,
  getFormacionesDisponibles,
  getFormacionesInscritas,
  inscribirFormacion,
} from '@/services/formacion.service';
import { FormacionAsociacion } from '@/types/formacionAsociacion';
import { useAsociacionesStore } from '@/store/asociaciones.store';
import { ConfirmacionModal } from '@/components/formacion/ConfirmacionModal';

export default function FormacionPage() {
  const params = useParams();
  const asociacionId = params.id as string;
  const asociacionStore = useAsociacionesStore.getState().data.find((x) => x.documentId === asociacionId);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formacionesDisponibles, setFormacionesDisponibles] = useState<Formacion[]>([]);
  const [formacionesInscritas, setFormacionesInscritas] = useState<FormacionAsociacion[]>([]);
  const [formacionSeleccionada, setFormacionSeleccionada] = useState<Formacion | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [numeroFicha, setCodigoFicha] = useState('');
  const [fecha, setFecha] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
  const [formacionParaBorrar, setFormacionParaBorrar] = useState<number | null>(null);
  const [alertaModalAbierto, setAlertaModalAbierto] = useState(false);
  const [alertaMensaje, setAlertaMensaje] = useState('');

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
      const inscritas = await getFormacionesInscritas(asociacionStore?.id || 0);

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
    if (numeroFicha && formacionSeleccionada) {
      try {
        if (formacionesInscritas.some((f) => f.codigoSofia === formacionSeleccionada.codigoSofia)) {
          setAlertaMensaje('La formación ya está asignada a esta asociación.');
          setAlertaModalAbierto(true);

          return;
        }
        const nuevaFormacion = await inscribirFormacion(asociacionId, {
          nombreFormacion: formacionSeleccionada.nombre,
          version: formacionSeleccionada.version,
          codigoSofia: formacionSeleccionada.codigoSofia,
          numeroFicha: numeroFicha,
        });

        setFormacionesInscritas([...formacionesInscritas, nuevaFormacion]);
        setModalAbierto(false);
        setCodigoFicha('');
        setMostrarBusqueda(false);
        setFormacionSeleccionada(null);
        setSearchTerm('');
      } catch (error) {
        console.error('Error al inscribir formación:', error);
      }
    }
  };

  const handleDesasignar = (formacionId: number) => {
    setFormacionParaBorrar(formacionId);
    setModalConfirmacionAbierto(true);
  };

  const confirmarDesasignacion = async () => {
    if (formacionParaBorrar) {
      try {
        const formacionAsociacionDocumentId =
          formacionesInscritas.find((f) => f.id === formacionParaBorrar)?.documentId ?? '';

        await desasignarFormacionAsociacion(formacionAsociacionDocumentId);
        setFormacionesInscritas(formacionesInscritas.filter((f) => f.id !== formacionParaBorrar));
      } catch (error) {
        console.error('Error al desasignar formación:', error);
      } finally {
        setModalConfirmacionAbierto(false);
        setFormacionParaBorrar(null);
      }
    }
  };

  const cancelarDesasignacion = () => {
    setModalConfirmacionAbierto(false);
    setFormacionParaBorrar(null);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCodigoFicha('');
    setFecha('');
  };

  const cerrarAlertaModal = () => {
    setAlertaModalAbierto(false);
    setAlertaMensaje('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-5xl mx-auto">
        <Header mostrarBusqueda={mostrarBusqueda} setMostrarBusqueda={setMostrarBusqueda} />

        {!mostrarBusqueda && (
          <CursosAsignadosList
            formaciones={formacionesInscritas}
            handleDesasignar={handleDesasignar}
            setMostrarBusqueda={setMostrarBusqueda}
          />
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
          formacion={formacionSeleccionada}
          handleConfirmarAsignacion={handleConfirmarAsignacion}
          numeroFicha={numeroFicha}
          setCodigoFicha={setCodigoFicha}
        />
      )}

      {modalConfirmacionAbierto && (
        <ConfirmacionModal
          mensaje="¿Estás seguro de que deseas desasignar esta formación?"
          onCancelar={cancelarDesasignacion}
          onConfirmar={confirmarDesasignacion}
        />
      )}

      {alertaModalAbierto && <AlertaModal mensaje={alertaMensaje} onAceptar={cerrarAlertaModal} />}
    </div>
  );
}
