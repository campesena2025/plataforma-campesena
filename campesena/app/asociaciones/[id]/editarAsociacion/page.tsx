"use client";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getAsociacionById,
  updateAsociacion,
} from "@/services/asociaciones.service";
import { organizationTypes, sector } from "@/types/enumerators";
import { LocationSelector } from "@/components/LocationSelector";
import {
  Asociacion,
  AsociacionRequest,
  toAsociacionRequest,
} from "@/types/asociacion";
import { FotoUpload } from "@/components/FotoUpload";
import { uploadFile } from "@/services/media.service";
import { useAsociacionesStore } from "@/store/asociaciones.store";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const invalidateAsociaciones = useAsociacionesStore(
    (state) => state.invalidate,
  );
  const asociaciones = useAsociacionesStore((state) => state.asociaciones);
  const [formData, setFormData] = useState<AsociacionRequest>();
  const [asociacion, setAsociacion] = useState<Asociacion>();
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [switchCodigo, setSwitchCodigo] = useState(false);

  useEffect(() => {
    if (id) {
      // Prioriza la búsqueda de la asociación en el store para evitar una llamada extra a la API
      const asociacionEncontrada = asociaciones?.data.find(
        (a) => a.documentId === (id as string),
      );

      if (asociacionEncontrada) {
        setAsociacion(asociacionEncontrada);
        setFormData(toAsociacionRequest(asociacionEncontrada));
      } else {
        // Si no se encuentra en el store (ej. refrescar la página), se busca en la API
        getAsociacionById(id as string).then((res) => {
          setAsociacion(res);
          setFormData(toAsociacionRequest(res));
        });
      }
    }
  }, [id, asociaciones]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...(prevData as AsociacionRequest),
      [name]: name === "formalizada" ? value === "true" : value,
    }));

    if (name === "formalizada" && value === "true") {
      setSwitchCodigo(true);
    } else {
      setSwitchCodigo(false);
    }
  };

  const handleLocationChange = (selection: {
    departamento?: { id: string | number };
    municipio?: { id: string | number };
    vereda?: { id: string | number };
  }) => {
    setFormData((prevData) => ({
      ...(prevData as AsociacionRequest),
      departamento: selection.departamento?.id || "",
      municipio: selection.municipio?.id || "",
      vereda: selection.vereda?.id || "",
    }));
  };

  const handleFotoChange = (file: File) => {
    setFotoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al actualizar la asociación.",
          color: "danger",
        });

        return;
      }

      if (!asociacion) {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al actualizar la asociación.",
          color: "danger",
        });

        return;
      }
      let updatedFormData = { ...formData };

      if (fotoFile) {
        const uploadedFiles = await uploadFile(fotoFile);

        if (uploadedFiles && uploadedFiles.length > 0) {
          updatedFormData.foto = uploadedFiles[0].id;
        }
      }

      await updateAsociacion(asociacion.documentId, updatedFormData);
      invalidateAsociaciones();
      addToast({
        title: "Asociación actualizada",
        description: "La asociación se ha actualizado correctamente.",
        color: "success",
      });
      router.push("/asociaciones");
    } catch {
      addToast({
        title: "Error",
        description: "Ha ocurrido un error al actualizar la asociación.",
        color: "danger",
      });
    }
  };

  return (
    <Card className="p-8 rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Editar Asociación</h1>
      </CardHeader>
      <CardBody>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <RadioGroup
            label="Formalizada"
            name="formalizada"
            orientation="horizontal"
            value={formData?.formalizada?.toString() || "false"}
            onChange={handleChange}
          >
            <Radio value="false">No</Radio>
            <Radio value="true">Sí</Radio>
          </RadioGroup>

          {switchCodigo ? (
            <Input
              id="nit"
              label="NIT"
              labelPlacement="outside"
              name="nit"
              type="text"
              value={formData?.nit || ""}
              onChange={handleChange}
            />
          ) : (
            <Input
              id="codigoInterno"
              label="Código Interno"
              labelPlacement="outside"
              name="codigoInterno"
              type="text"
              value={formData?.codigoInterno || ""}
              onChange={handleChange}
            />
          )}

          <Textarea
            id="nombreAsociacion"
            label="Nombre de la Asociación"
            labelPlacement="outside"
            name="nombreAsociacion"
            value={formData?.nombreAsociacion || ""}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <FotoUpload
              initialImageUrl={asociacion?.foto}
              onFileChange={handleFotoChange}
            />
          </div>
          <div className="md:col-span-2">
            <LocationSelector
              initialVeredaId={formData?.vereda}
              onChange={handleLocationChange}
            />
          </div>
          <Select
            isRequired
            label="Tipo de Organización"
            labelPlacement="outside"
            name="tipoOrganizacion"
            selectedKeys={[formData?.tipoOrganizacion || ""]}
            onChange={handleChange}
          >
            {organizationTypes.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>

          <Select
            label="Sector"
            labelPlacement="outside"
            name="sector"
            selectedKeys={[formData?.sector || ""]}
            onChange={handleChange}
          >
            {sector.map((type) => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>
          <Textarea
            id="razonCreacion"
            label="Razón de Creación"
            labelPlacement="outside"
            name="razonCreacion"
            value={formData?.razonCreacion || ""}
            onChange={handleChange}
          />
          <Input
            id="productoServicio"
            label="Producto o Servicio"
            labelPlacement="outside"
            name="productoServicio"
            type="text"
            value={formData?.productoServicio || ""}
            onChange={handleChange}
          />
          <Input
            id="codigoCIUU"
            label="Código CIUU"
            labelPlacement="outside"
            name="codigoCIUU"
            type="text"
            value={formData?.codigoCIUU || ""}
            onChange={handleChange}
          />
          <Textarea
            className="md:col-span-2"
            id="observaciones"
            label="Observaciones"
            labelPlacement="outside"
            maxLength={255}
            name="observaciones"
            placeholder="Si su vereda u otro dato no aparece en las listas, anótelo aquí."
            value={formData?.observaciones || ""}
            onChange={handleChange}
          />
          <div className="md:col-span-2 flex justify-end mt-8">
            <Button color="primary" size="lg" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Page;
