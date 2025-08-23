"use client";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React, { useState } from "react";

import { organizationTypes, sector } from "@/types/enumerators";

const Page = () => {
  const [formData, setFormData] = useState({
    nit: "123456789-0",
    nombreAsociacion: "Asociación de Agricultores de Ejemplo",
    formalizada: "true",
    municipio: "Municipio de Ejemplo",
    vereda: "Vereda de Ejemplo",
    participante_asociacions: "Participante de Ejemplo",
    tipoOrganizacion: "Asociacion",
    codigoInterno: "CI-001",
    sector: "Construcción",
    razonCreacion: "Razón de ejemplo para la creación de la asociación.",
    productoServicio: "Café especial",
    codigoCIUU: "C1234",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card className="p-8 rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Editar Asociación</h1>
      </CardHeader>
      <CardBody>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="nit"
            label="NIT"
            labelPlacement="outside"
            name="nit"
            type="text"
            value={formData.nit}
            onChange={handleChange}
          />
          <Textarea
            id="nombreAsociacion"
            label="Nombre de la Asociación"
            labelPlacement="outside"
            name="nombreAsociacion"
            value={formData.nombreAsociacion}
            onChange={handleChange}
          />
          <RadioGroup
            label="Formalizada"
            name="formalizada"
            orientation="horizontal"
            value={formData.formalizada}
            onChange={handleChange}
          >
            <Radio value="false">No</Radio>
            <Radio value="true">Sí</Radio>
          </RadioGroup>
          <Select
            label="Municipio"
            labelPlacement="outside"
            name="municipio"
            selectedKeys={[formData.municipio]}
            onChange={handleChange}
          >
            <SelectItem key="none">Add or create a relation</SelectItem>
          </Select>
          <Select
            label="Vereda"
            labelPlacement="outside"
            name="vereda"
            selectedKeys={[formData.vereda]}
            onChange={handleChange}
          >
            <SelectItem key="none">Add or create a relation</SelectItem>
          </Select>
          <Select
            isRequired
            label="Tipo de Organización"
            labelPlacement="outside"
            name="tipoOrganizacion"
            selectedKeys={[formData.tipoOrganizacion]}
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
            value={formData.codigoInterno}
            onChange={handleChange}
          />
          <Select
            label="Sector"
            labelPlacement="outside"
            name="sector"
            selectedKeys={[formData.sector]}
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
            value={formData.razonCreacion}
            onChange={handleChange}
          />
          <Input
            id="productoServicio"
            label="Producto o Servicio"
            labelPlacement="outside"
            name="productoServicio"
            type="text"
            value={formData.productoServicio}
            onChange={handleChange}
          />
          <Input
            id="codigoCIUU"
            label="Código CIUU"
            labelPlacement="outside"
            name="codigoCIUU"
            type="text"
            value={formData.codigoCIUU}
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
