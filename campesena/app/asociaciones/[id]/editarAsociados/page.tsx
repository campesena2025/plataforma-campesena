"use client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";

import AsociadosTable from "@/components/asociados";
import { useAsociacionesStore } from "@/store/asociaciones.store";

const Page = () => {
  const { id } = useParams();
  const asociaciones = useAsociacionesStore((state) => state.asociaciones);

  const [initialAssociates, setInitialAssociates] = useState<any[] | null>(
    null,
  );
  const [nombreAsociacion, setNombreAsociacion] = useState("");
  const [idAsociacion, setIdAsociacion] = useState(0);

  useEffect(() => {
    if (id && asociaciones) {
      const asociacionEncontrada = asociaciones.data.find(
        (a) => a.documentId === (id as string),
      );

      if (asociacionEncontrada) {
        setNombreAsociacion(asociacionEncontrada.nombreAsociacion);
        setIdAsociacion(asociacionEncontrada.id);
        setInitialAssociates(asociacionEncontrada.participantes || []);
      }
    }
  }, [id, asociaciones]);

  return (
    <Card className="rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Administrar Asociados</h1>
          {nombreAsociacion && (
            <p className="text-lg text-default-500">{nombreAsociacion}</p>
          )}
        </div>
      </CardHeader>
      <CardBody>
        {initialAssociates ? (
          <AsociadosTable
            asociacion={idAsociacion}
            initialAssociates={initialAssociates}
          />
        ) : (
          <div className="flex justify-center items-center h-40">
            <Spinner label="Cargando asociados..." />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Page;
