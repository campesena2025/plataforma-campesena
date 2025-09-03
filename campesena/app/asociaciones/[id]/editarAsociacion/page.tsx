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
import { AsociacionFormData } from "@/types/asociacion";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<AsociacionFormData>();

  useEffect(() => {
    if (id) {
      getAsociacionById(id as string).then((res) => {
        const { attributes, id: idAsoc } = res.data[0];
        const data: AsociacionFormData = {
          id: idAsoc,
          ...attributes,
          departamentoId:
            attributes.municipio.data.attributes.departamento.data.id,
          municipioId: attributes.municipio.data.id,
          veredaId: attributes.vereda.data.id,
        };

        setFormData(data);
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...(prevData as AsociacionFormData),
      [name]: name === "formalizada" ? value === "true" : value,
    }));
  };

  const handleLocationChange = (selection: {
    departamento?: { id: string | number };
    municipio?: { id: string | number };
    vereda?: { id: string | number };
  }) => {
    setFormData((prevData) => ({
      ...(prevData as AsociacionFormData),
      departamentoId: selection.departamento?.id.toString() || "",
      municipioId: selection.municipio?.id.toString() || "",
      veredaId: selection.vereda?.id.toString() || "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await updateAsociacion(formData.id.toString(), formData);
      addToast({
        title: "Asociación actualizada",
        description: "La asociación se ha actualizado correctamente.",
        color: "success",
      });
      router.push("/asociaciones");
    } catch (error) {
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
            <LocationSelector
              initialVeredaId={formData?.veredaId}
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
