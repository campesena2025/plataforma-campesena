'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, addToast } from '@heroui/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { read, utils } from 'xlsx';

import { ExcelUpload } from './ExcelUpload';
import { ResultModal } from './ResultModal';

import { createAsociado } from '@/services/asociado.service';
import { ParticipanteRequest } from '@/types/participante';
import { useAsociacionesStore } from '@/store/asociaciones.store';

interface UploadAssociatesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asociacionId: number;
}

export const UploadAssociatesModal = ({ isOpen, onOpenChange, asociacionId }: UploadAssociatesModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    color: 'default' as 'success' | 'warning' | 'danger' | 'default',
  });
  const asociacion = useAsociacionesStore((state) => state.data.find((a) => a.id === asociacionId));
  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');

    link.href = '/plantilla/plantilla-asociados.xlsx';
    link.setAttribute('download', 'plantilla-asociados.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async () => {
    setCargando(true);

    if (!file) {
      addToast({
        title: 'Error',
        description: 'Por favor, seleccione un archivo.',
        color: 'danger',
      });

      return;
    }

    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);

      const existingDocumentNumbers = asociacion?.participantes?.map((p) => p.numeroDocumento) || [];

      const promises = json.map(async (row: any) => {
        if (existingDocumentNumbers.includes(row.numeroDocumento)) {
          throw { type: 'exists', row };
        }

        const participante: ParticipanteRequest = {
          documentId: '',
          asociacions: [],
          tipoDocumento: row.tipoDocumento,
          numeroDocumento: row.numeroDocumento,
          nombreCompleto: row.nombreCompleto,
          genero: row.genero,
          correoElectronico: row.correoElectronico,
          tipoPoblacion: row.tipoPoblacion,
          edad: row.edad,
          nivelEstudio: row.nivelEstudio,
          numeroContacto: row.numeroContacto,
        };

        await createAsociado(participante, asociacionId);
      });

      const results = await Promise.allSettled(promises);

      const successfulUploads = results.filter((r) => r.status === 'fulfilled').length;
      const failedUploads = results.filter((r) => r.status === 'rejected');

      if (failedUploads.length > 0) {
        const failedCount = failedUploads.length;
        const successCount = successfulUploads;

        const existingFailures = failedUploads
          .filter((f: any) => f.reason?.type === 'exists')
          .map((f: any) => f.reason.row);

        const otherFailures = failedUploads.filter((f: any) => f.reason?.type !== 'exists');

        let logMessage = `Carga masiva finalizada. \nCorrectos: ${successCount}. \nFallidos: ${failedCount}.`;

        if (existingFailures.length > 0) {
          logMessage += `\nAsociados que ya existen: \n${existingFailures
            .map((r: any) => `- ${r.nombreCompleto} (${r.numeroDocumento})`)
            .join('\n')}`;

          setResultModal({
            isOpen: true,
            title: 'Asociados existentes',
            message: logMessage,
            color: 'warning',
          });

          return;
        }

        if (otherFailures.length > 0) {
          logMessage += `\nOtros errores: ${otherFailures.length}`;
        }

        addToast({
          title: 'Carga finalizada con errores',
          description: `Se cargaron ${successCount} asociados. Fallaron ${failedCount}.`,
          color: 'warning',
        });

        return;
      } else {
        addToast({
          title: 'Éxito',
          description: 'Asociados cargados correctamente.',
          color: 'success',
        });
      }
    } catch (error) {
      addToast({
        title: 'Error',
        description: 'Ocurrió un error al cargar los asociados.',
        color: 'danger',
      });
    } finally {
      setFile(null);
      onOpenChange(false);
      setCargando(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cargue masivo de Asociados</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-semibold">1. Descargue la plantilla</p>
                    <p className="text-sm text-gray-600">
                      Descargue la plantilla de excel para registrar los asociados.
                    </p>
                    <Button
                      className="mt-2"
                      color="primary"
                      startContent={<ArrowDownTrayIcon className="w-5 h-5" />}
                      onPress={handleDownloadTemplate}
                    >
                      Descargar Plantilla
                    </Button>
                  </div>
                  <div>
                    <p className="font-semibold">2. Cargue el archivo</p>
                    <p className="text-sm text-gray-600">
                      Cargue aquí el archivo despues de diligenciado con los asociados.
                    </p>
                    <div className="mt-2">
                      <ExcelUpload
                        message="Arrastra y suelta un archivo de Excel aquí, o haz clic para seleccionar uno."
                        onFileChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" disabled={cargando || !file} onPress={handleUpload}>
                  Cargar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ResultModal
        color={resultModal.color}
        isOpen={resultModal.isOpen}
        message={resultModal.message}
        title={resultModal.title}
        onOpenChange={(isOpen) => setResultModal((prev) => ({ ...prev, isOpen }))}
      />
    </>
  );
};
