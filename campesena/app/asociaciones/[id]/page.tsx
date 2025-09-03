"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CardAssociation from "@/components/CardAssociation";
import { Asociacion } from "@/types/asociacion";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [asociacion, setAsociacion] = useState<Asociacion | null>(null);

  const asociacionTemp = {
    id: 1,
    documentId: "abc123",
    nit: "123456789-0",
    nombreAsociacion: "Asociación de Agricultores de Ejemplo",
    formalizada: true,
    veredaId: "185985",
    departamentoId: "18",
    municipioId: "151",
    participante_asociacions: "Participante de Ejemplo",
    tipoOrganizacion: "Asociacion",
    codigoInterno: "CI-001",
    sector: "Construcción",
    razonCreacion: "Razón de ejemplo para la creación de la asociación.",
    productoServicio: "Café especial",
    codigoCIUU: "C1234",
    observaciones: "Observaciones de ejemplo para la asociación.",
    celular: "",
    correo: "",
    representante: "",
    estado: "",
    foto: "",
    warning: false,
  };

  useEffect(() => {
    if (id) {
      setAsociacion(asociacionTemp);
      // getAsociacionById(id as string).then((data) => {
      //   setAsociacion(data);
      // });
    }
  }, [id]);

  const procedimientoListener = (accion: string, id: number) => {
    router.push(`/asociaciones/${id}/${accion}`);
  };

  if (!asociacion) {
    return <div>Cargando...</div>;
  }

  return (
    <CardAssociation
      key={asociacion.id}
      {...asociacion}
      procedimiento={procedimientoListener}
    />
  );
};

export default Page;
