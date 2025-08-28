"use client";
import React from "react";
import { useRouter } from "next/navigation";

import CardAssociation from "@/components/CardAssociation";

const Page = () => {
  const router = useRouter();
  const asociacion = {
    id: 1,
    nombreAsociacion: "Asociación de Cafeteros del Huila",
    nit: "900123456-7",
    celular: "3101234567",
    correo: "aso.cafeteros.huila@email.com",
    representante: "Maria Rodriguez",
    estado: "En Diagnóstico",
    foto: "https://heroui.com/images/album-cover.png",
    warning: false,
  };

  const procedimientoListener = (accion: string, id: number) => {
    router.push(`/asociaciones/${id}/${accion}`);
  };

  return (
    <CardAssociation
      key={asociacion.id}
      {...asociacion}
      procedimiento={procedimientoListener}
    />
  );
};

export default Page;
