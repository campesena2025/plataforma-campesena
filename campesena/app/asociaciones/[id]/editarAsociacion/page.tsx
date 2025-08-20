'use client';
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

const Page = () => {
  return (
    <Card className="p-8 rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Editar Asociación</h1>
      </CardHeader>
      <CardBody>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="nit"
            name="nit"
            type="text"
            label="NIT"
            labelPlacement="outside"
          />
          <Textarea
            id="nombreAsociacion"
            name="nombreAsociacion"
            label="Nombre de la Asociación"
            labelPlacement="outside"
          />
          <RadioGroup label="Formalizada" orientation="horizontal">
            <Radio value="false">No</Radio>
            <Radio value="true">Sí</Radio>
          </RadioGroup>
          <Select label="Municipio" name="municipio" labelPlacement="outside">
            <SelectItem key="none" value="">
              Add or create a relation
            </SelectItem>
          </Select>
          <Select label="Vereda" name="vereda" labelPlacement="outside">
            <SelectItem key="none" value="">
              Add or create a relation
            </SelectItem>
          </Select>
          <Select
            label="Participante Asociaciones"
            name="participante_asociacions"
            labelPlacement="outside"
          >
            <SelectItem key="none" value="">
              Add or create a relation
            </SelectItem>
          </Select>
          <Select
            label="Tipo de Organización"
            name="tipoOrganizacion"
            labelPlacement="outside"
          >
            <SelectItem key="none" value="">
              Choose here
            </SelectItem>
          </Select>
          <Input
            id="codigoInterno"
            name="codigoInterno"
            type="text"
            label="Código Interno"
            labelPlacement="outside"
          />
          <Select label="Sector" name="sector" labelPlacement="outside">
            <SelectItem key="none" value="">
              Choose here
            </SelectItem>
          </Select>
          <Textarea
            id="razonCreacion"
            name="razonCreacion"
            label="Razón de Creación"
            labelPlacement="outside"
          />
          <Input
            id="productoServicio"
            name="productoServicio"
            type="text"
            label="Producto o Servicio"
            labelPlacement="outside"
          />
          <Input
            id="codigoCIUU"
            name="codigoCIUU"
            type="text"
            label="Código CIUU"
            labelPlacement="outside"
          />
          <div className="md:col-span-2 flex justify-end mt-8">
            <Button type="submit" color="primary" size="lg">
              Guardar
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Page;
