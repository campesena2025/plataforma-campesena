"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "@heroui/image";

interface FotoUploadProps {
  onFileChange: (file: File) => void;
  initialImageUrl?: string;
}

export const FotoUpload: React.FC<FotoUploadProps> = ({
  onFileChange,
  initialImageUrl,
}) => {
  const [preview, setPreview] = useState<string | null>(
    initialImageUrl || null,
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        onFileChange(file);
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? "border-primary" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="flex flex-col items-center">
          <Image
            alt="Previsualización de la foto"
            className="max-h-64 object-contain"
            height={250}
            src={preview}
            width={250}
          />
          <p className="mt-4 text-sm text-gray-500">
            Arrastra y suelta una nueva foto aquí, o haz clic para
            seleccionarla.
          </p>
        </div>
      ) : (
        <p>
          {isDragActive
            ? "Suelta la foto aquí..."
            : "Arrastra y suelta una foto aquí, o haz clic para seleccionarla."}
        </p>
      )}
    </div>
  );
};
