"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

import CardAssociation from "@/components/CardAssociation";
import { Asociaciones } from "@/types/asociacion";
import { getAllAsociaciones } from "@/services/asociaciones.service";

export default function AsociacionesPage() {
  const router = useRouter();
  const [asociaciones, setAsociaciones] = useState<Asociaciones>();

  useEffect(() => {
    getAllAsociaciones().then((data) => {
      setAsociaciones(data);
    });

    return;
  }, []);

  const procedimientoListener = (accion: string, id: string | number) => {
    router.push(`/asociaciones/${id}/${accion}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-2xl font-bold">Control de Asociaciones</h1>
        <Button
          onPress={() => {
            router.push("/asociaciones/crear");
          }}
        >
          Crear Asociación
        </Button>
      </div>
      {asociaciones?.data.map((associationData) => (
        <CardAssociation
          key={associationData.id}
          asociacion={associationData}
          procedimiento={procedimientoListener}
        />
      ))}
    </>
  );
}
