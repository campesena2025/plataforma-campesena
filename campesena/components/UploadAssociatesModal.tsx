'use client';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

import { ExcelUpload } from './ExcelUpload';

interface UploadAssociatesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asociacionId: number;
}

export const UploadAssociatesModal = ({ isOpen, onOpenChange, asociacionId }: UploadAssociatesModalProps) => {
  const [file, setFile] = useState<File | null>(null);

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
    if (!file) {
      // TODO: Show an error message
      return;
    }
    // TODO: Implement the upload logic here
    console.log('Uploading file:', file.name);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Cargue masivo de Asociados</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-semibold">1. Descargue la plantilla</p>
                  <p className="text-sm text-gray-600">Descargue la plantilla de excel para registrar los asociados.</p>
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
              <Button color="primary" onPress={handleUpload}>
                Cargar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};