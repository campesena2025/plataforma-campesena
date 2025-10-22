'use client';
import { DocumentIcon } from '@heroicons/react/24/solid';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { Media } from '@/types/media';

interface FileDetails {
  name: string;
  size: string;
  type: string;
}

interface PdfUploadProps {
  onFileChange: (file: File) => void;
  initialFile?: Media;
  message?: string;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ onFileChange, initialFile, message }) => {
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const currentFile = acceptedFiles[0];

        onFileChange(currentFile);
        setFile(currentFile);
        setFileDetails({
          name: currentFile.name,
          size: `${(currentFile.size / 1024).toFixed(2)} KB`,
          type: currentFile.type,
        });
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer relative ${isDragActive ? 'border-primary' : 'border-gray-300'
        }`}
    >
      <input {...getInputProps()} />
      {file || initialFile ? (
        <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2">
          <div>
            <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto" />
          </div>
          {fileDetails && (
            <div className="grid grid-cols-1 gap-x-1 md:grid-cols-1">
              <p>
                <b>Nombre:</b> {fileDetails.name}
              </p>
              <p>
                <b>Tamaño:</b> {fileDetails.size}
              </p>
              <p>
                <b>Formato:</b> {fileDetails.type}
              </p>
            </div>
          )}
          {initialFile && !fileDetails && (
            <div className="grid grid-cols-1 gap-x-1 md:grid-cols-1">
              <p>
                <b>Nombre:</b> {initialFile.name}
              </p>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${initialFile.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={(e) => e.stopPropagation()} // Prevent opening file dialog
              >
                Descargar
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48">
          <DocumentIcon className="w-16 h-16 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            {isDragActive
              ? 'Suelta el PDF aquí...'
              : message
                ? message
                : 'Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar uno.'}
          </p>
        </div>
      )}
    </div>
  );
};
