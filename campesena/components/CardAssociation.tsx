"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";
import Image from "next/image";
import { Badge } from "@heroui/badge";
import { Skeleton } from "@heroui/react";

import { Asociacion } from "@/types/asociacion";

interface Props {
  asociacion: Asociacion;
  procedimiento: (accion: string, id: number | string) => void;
}

export default function CardAssociation({ asociacion, procedimiento }: Props) {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full pt-2 mt-2"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          {/* Imagen de la asociación */}
          <div className="relative col-span-6 md:col-span-2 flex justify-center">
            {asociacion.foto?.url ? (
              <Image
                alt="Imagen Asociación"
                className="object-cover rounded-lg border"
                height={120}
                src={process.env.NEXT_PUBLIC_API_URL + asociacion.foto.url}
                width={120}
              />
            ) : (
              <Skeleton className="rounded-lg w-[120px] h-[120px]" />
            )}
          </div>

          {/* Información principal */}
          <div className="flex flex-col col-span-6 md:col-span-10 gap-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-foreground">
                  {asociacion.nombreAsociacion}
                </h1>
                <p className="text-sm text-foreground/80">
                  {asociacion.formalizada ? (
                    <>
                      <strong>NIT:</strong> {asociacion.nit}
                    </>
                  ) : (
                    <>
                      <strong>Código Interno:</strong>{" "}
                      {asociacion.codigoInterno}
                    </>
                  )}
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>Celular:</strong>{" "}
                  {asociacion.representanteLegal?.numeroContacto}
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>Correo:</strong>{" "}
                  {asociacion.representanteLegal?.correoElectronico}
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>Representante:</strong>{" "}
                  {asociacion.representanteLegal?.nombreCompleto}
                </p>
              </div>
              {/* Estado y botones */}
              <div className="flex flex-col items-end gap-2 min-w-[160px]">
                {asociacion.warning && (
                  <Badge
                    className=""
                    color="danger"
                    content=""
                    placement="top-right"
                  >
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold mb-2">
                      {asociacion.estado}
                    </span>
                  </Badge>
                )}
                {!asociacion.warning && (
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold mb-2">
                    {asociacion.estado}
                  </span>
                )}
                <div className="flex flex-col gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      procedimiento("editarAsociacion", asociacion.documentId);
                    }}
                  >
                    Editar Asociación
                  </Button>
                  <Button
                    color="secondary"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      procedimiento("editarAsociados", asociacion.documentId);
                    }}
                  >
                    Administrar Asociados
                  </Button>
                </div>
              </div>
            </div>

            {/* Regleta de botones inferior */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("diagnostico", asociacion.id);
                }}
              >
                Diagnóstico
              </Button>
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("formacion", asociacion.id);
                }}
              >
                Formación
              </Button>
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("formulacion", asociacion.id);
                }}
              >
                Formulación
              </Button>
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("postulacion", asociacion.id);
                }}
              >
                Postulación
              </Button>
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("evaluacion", asociacion.id);
                }}
              >
                Evaluación
              </Button>
              <Button
                color="warning"
                size="sm"
                variant="ghost"
                onPress={() => {
                  procedimiento("kit", asociacion.id);
                }}
              >
                Kit de producto
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
