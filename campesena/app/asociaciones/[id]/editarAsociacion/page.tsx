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
  uploadFile,
} from "@/services/asociaciones.service";
import { organizationTypes, sector } from "@/types/enumerators";
import { LocationSelector } from "@/components/LocationSelector";
import {
  Asociacion,
  AsociacionRequest,
  toAsociacionRequest,
} from "@/types/asociacion";
import { FotoUpload } from "@/components/FotoUpload";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<AsociacionRequest>();
  const [asociacion, setAsociacion] = useState<Asociacion>();
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      getAsociacionById(id as string).then((res) => {
        setFormData(toAsociacionRequest(res));
        setAsociacion(res);
      });
    }
  }, [id]);

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
  };

  const handleLocationChange = (selection: {
    departamento?: { id: string | number };
    municipio?: { id: string | number };
    vereda?: { id: string | number };
  }) => {
    setFormData((prevData) => ({
      ...(prevData as AsociacionRequest),
      departamentoId: selection.departamento?.id.toString() || "",
      municipioId: selection.municipio?.id.toString() || "",
      veredaId: selection.vereda?.id.toString() || "",
    }));
  };

  const handleFotoChange = (file: File) => {
    setFotoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    try {
      if (asociacion) {
        let updatedFormData = { ...formData };

        if (fotoFile) {
          const uploadedFiles = await uploadFile(fotoFile);

          if (uploadedFiles && uploadedFiles.length > 0) {
            updatedFormData.foto = uploadedFiles[0].id;
          }
        }

        await updateAsociacion(asociacion.id.toString(), updatedFormData);
        addToast({
          title: "Asociación actualizada",
          description: "La asociación se ha actualizado correctamente.",
          color: "success",
        });
        router.push("/asociaciones");
      } else {
        addToast({
          title: "Error",
          description: "Ha ocurrido un error al actualizar la asociación.",
          color: "danger",
        });
      }
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
          <Input
            id="nit"
            label="NIT"
            labelPlacement="outside"
            name="nit"
            type="text"
            value={formData?.nit || ""}
            onChange={handleChange}
          />
          <Textarea
            id="nombreAsociacion"
            label="Nombre de la Asociación"
            labelPlacement="outside"
            name="nombreAsociacion"
            value={formData?.nombreAsociacion || ""}
            onChange={handleChange}
          />
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
          <div className="md:col-span-2">
            <FotoUpload
              initialImageUrl={asociacion?.foto?.url}
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
          <Input
            id="codigoInterno"
            label="Código Interno"
            labelPlacement="outside"
            name="codigoInterno"
            type="text"
            value={formData?.codigoInterno || ""}
            onChange={handleChange}
          />
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
