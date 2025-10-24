'use client';

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';

interface ResultModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  color?: 'success' | 'warning' | 'danger' | 'default';
}

export const ResultModal = ({ isOpen, onOpenChange, title, message, color = 'default' }: ResultModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAsTxt = () => {
    setIsDownloading(true);
    try {
      const element = document.createElement('a');
      const file = new Blob([message], { type: 'text/plain' });

      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}_result.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Determine the color class based on the color prop
  const colorClass = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    default: 'text-gray-600',
  }[color];

  return (
    <Modal isOpen={isOpen} size="2xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className={`flex items-center justify-between ${colorClass}`}>
              <span className="text-xl font-bold">{title}</span>
            </ModalHeader>
            <ModalBody>
              <div className="max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap break-words text-gray-700">{message}</pre>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-between">
              <Button
                color="primary"
                isLoading={isDownloading}
                startContent={!isDownloading && <span>↓</span>}
                onPress={downloadAsTxt}
              >
                {isDownloading ? 'Descargando...' : 'Descargar como TXT'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
