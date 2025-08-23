'use client';
import AsociadosTable from "@/components/asociados";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

const initialAssociates = [
  {
    id: 1,
    documentNumber: "123456789",
    fullName: "Juan Perez",
    gender: "Masculino",
    email: "juan.perez@example.com",
    contactNumber: "3001234567",
    participantType: "Representante legal",
    populationType: "Campesino",
    age: 35,
    educationLevel: "Profesional",
  },
  {
    id: 2,
    documentNumber: "987654321",
    fullName: "Maria Rodriguez",
    gender: "Femenino",
    email: "maria.rodriguez@example.com",
    contactNumber: "3109876543",
    participantType: "Participante Asociacion",
    populationType: "Indigena",
    age: 28,
    educationLevel: "Secundaria",
  },
  {
    id: 3,
    documentNumber: "1122334455",
    fullName: "Carlos Gomez",
    gender: "Masculino",
    email: "carlos.gomez@example.com",
    contactNumber: "3215556677",
    participantType: "Participante Asociacion",
    populationType: "Raizal",
    age: 42,
    educationLevel: "Técnico",
  },
];

const Page = () => {
  return (
    <Card className="rounded-lg w-full max-w-7xl mx-auto mt-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">Editar Asociados</h1>
      </CardHeader>
      <CardBody>
        <AsociadosTable initialAssociates={initialAssociates} />
      </CardBody>
    </Card>
  );
};

export default Page;
