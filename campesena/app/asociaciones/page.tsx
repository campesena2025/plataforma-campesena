"use client";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/react";

import CardAssociation from "@/components/CardAssociation";
import { useAsociacionesStore } from "@/store/asociaciones.store";

export default function AsociacionesPage() {
  const router = useRouter();
  const { data, loading } = useAsociacionesStore();

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
      {loading && (
        <div className="flex justify-center items-center h-40">
          <Spinner label="Cargando asociaciones..." />
        </div>
      )}
      {!loading && data?.length === 0 && (
        <div className="flex justify-center items-center h-40 text-center">
          <p className="text-lg text-gray-500">
            No hay asociaciones creadas para el instructor.
          </p>
        </div>
      )}
      {data?.map((associationData) => (
        <CardAssociation
          key={associationData.id}
          asociacion={associationData}
          procedimiento={procedimientoListener}
        />
      ))}
    </>
  );
}
