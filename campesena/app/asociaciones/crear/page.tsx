"use client";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { createAsociacion } from "@/services/asociaciones.service";
import { organizationTypes, sector } from "@/types/enumerators";
import { LocationSelector } from "@/components/LocationSelector";
import { AsociacionRequest } from "@/types/asociacion";
import { useAsociacionesStore } from "@/store/asociaciones.store";

const Page = () => {
  const router = useRouter();
  const [switchCodigo, setSwitchCodigo] = useState(false);
  const invalidateAsociaciones = useAsociacionesStore(
    (state) => state.invalidate,
  );
  const [formData, setFormData] = useState<Partial<AsociacionRequest>>({
    formalizada: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "formalizada" ? value === "true" : value,
    }));

    if (name === "formalizada" && value === "true") {
      setSwitchCodigo(true);
    } else {
      setSwitchCodigo(false);
    }
  };

  const handleChangeEstadoAsociacion = (
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
      ...prevData,
      departamento: selection.departamento?.id.toString() || "",
      municipio: selection.municipio?.id.toString() || "",
      vereda: selection.vereda?.id.toString() || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createAsociacion(formData as Omit<AsociacionRequest, "id">);
      invalidateAsociaciones();
      router.push("/asociaciones");
      addToast({
        title: "Asociación creada",
        description: "La asociación se ha creado correctamente.",
        color: "success",
      });
    } catch {
      addToast({
        title: "Error",
        description: "Ha ocurrido un error al crear la asociación.",
        color: "danger",
      });
    }
  };

  return (
    <Card className="p-8 rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Crear Asociación</h1>
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
            onChange={handleChangeEstadoAsociacion}
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
            isRequired
            id="nombreAsociacion"
            label="Nombre de la Asociación"
            labelPlacement="outside"
            name="nombreAsociacion"
            value={formData?.nombreAsociacion || ""}
            onChange={handleChange}
          />

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
            isRequired
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
            isRequired
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
