'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image } from '@heroui/image';

import { ImageIcon } from './icons';

import { Media } from '@/types/media';

interface FileDetails {
  name: string;
  size: string;
  type: string;
  width: number;
  height: number;
}

interface FotoUploadProps {
  onFileChange: (file: File) => void;
  initialImageUrl?: Media;
}

export const FotoUpload: React.FC<FotoUploadProps> = ({ onFileChange, initialImageUrl }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialImageUrl) {
      const imageUrl = process.env.NEXT_PUBLIC_API_URL + initialImageUrl.url;

      setPreview(imageUrl);
      setFileDetails(null);

      const img = new window.Image();

      img.src = process.env.NEXT_PUBLIC_API_URL + initialImageUrl.url;
      img.onload = (event: Event) => {
        // Check if file is defined before accessing its properties
        const file = (event.target as HTMLInputElement).files?.[0];

        const fileName = file ? file.name : initialImageUrl.url.split('/').pop();

        setFileDetails({
          name: fileName || 'unknown',
          size: `${(file?.size ? file.size / 1024 : 0).toFixed(2)} KB`,
          type: file?.type || 'unknown',
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [initialImageUrl]);

  useEffect(() => {
    if (dataUrl && file) {
      const img = document.createElement('img');

      img.src = dataUrl;
      img.onload = () => {
        setFileDetails({
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type,
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [dataUrl, file]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const currentFile = acceptedFiles[0];

        onFileChange(currentFile);
        setFile(currentFile);

        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result as string);
          setDataUrl(reader.result as string);
        };
        reader.readAsDataURL(currentFile);
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer relative ${
        isDragActive ? 'border-primary' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="grid grid-cols-1 gap-x-2 md:grid-cols-2">
          <Image
            alt="Previsualización de la foto"
            className="max-h-80 w-full object-contain"
            height={400}
            src={preview}
            width={400}
          />
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
              <p>
                <b>Dimensiones:</b> {fileDetails.width}x{fileDetails.height}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48">
          <ImageIcon className="w-16 h-16 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            {isDragActive
              ? 'Suelta la foto aquí...'
              : 'Arrastra y suelta una foto aquí, o haz clic para seleccionarla.'}
          </p>
        </div>
      )}
    </div>
  );
};
