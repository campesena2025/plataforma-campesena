"use client";
import { useRouter } from "next/navigation";

import CardAssociation from "@/components/CardAssociation";

export default function AsociacionesPage() {
  const router = useRouter();
  const asociaciones = [
    {
      id: 1,
      nombreAsociacion: "Asociación de Cafeteros del Huila",
      nit: "900123456-7",
      celular: "3101234567",
      correo: "aso.cafeteros.huila@email.com",
      representante: "Maria Rodriguez",
      estado: "En Diagnóstico",
      foto: "https://heroui.com/images/album-cover.png",
      warning: false,
    },

    {
      id: 2,
      nombreAsociacion: "Asociación de Cafeteros del Huila",
      nit: "900123456-7",
      celular: "3101234567",
      correo: "aso.cafeteros.huila@email.com",
      representante: "Maria Rodriguez",
      estado: "En Diagnóstico",
      foto: "https://heroui.com/images/album-cover.png",
      warning: true,
    },
  ];

  const procedimientoListener = (accion: string, id: number) => {
    router.push(`/asociaciones/${id}/${accion}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Control de Asociaciones</h1>
      {asociaciones.map((associationData) => (
        <CardAssociation
          key={associationData.id}
          {...associationData}
          procedimiento={procedimientoListener}
        />
      ))}
    </>
  );
}
