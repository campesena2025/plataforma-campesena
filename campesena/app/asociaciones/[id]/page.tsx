"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CardAssociation from "@/components/CardAssociation";
import { Asociacion } from "@/types/asociacion";
import { getAsociacionById } from "@/services/asociaciones.service";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [asociacion, setAsociacion] = useState<Asociacion | null>(null);

  useEffect(() => {
    if (id) {
      getAsociacionById(id as string).then((data) => {
        setAsociacion(data);
      });
    }
  }, [id]);

  const procedimientoListener = (accion: string, id: number | string) => {
    router.push(`/asociaciones/${id}/${accion}`);
  };

  if (!asociacion) {
    return <div>Cargando...</div>;
  }

  return (
    <CardAssociation
      key={asociacion.id}
      asociacion={asociacion}
      procedimiento={procedimientoListener}
    />
  );
};

export default Page;
