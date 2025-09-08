import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { addToast } from "@heroui/toast";

import { ParticipanteRequest } from "@/types/participante";
import { createAsociado } from "@/services/asociado.service";
import { useAsociacionesStore } from "@/store/asociaciones.store";

const populationTypes = [
  "VULNERABLE",
  "PALENQUERO",
  "RAIZAL",
  "AFROCOLOMBIANO",
  "AFROCOLOMBIANOS_DESPLAZADOS_POR_LA_VIOLENCIA",
  "CABEZA DE FAMILIA",
  "ARTESANOS",
  "DESPLAZADOS_DISCAPACITADOS",
  "MUJERCABEZA DE_AMILIA",
  "DESPLAZADOS_POR_FENOMENOS_NATURALES",
  "DISCAPACITADO COGNITIVO",
  "DESPLAZADOS POR LA VIOLENCIA",
  "DESPLAZADOS_POR LA VIOLENCIA CABEZA DE FAMILIA",
  "JOVEN RURAL",
  "DISCAPACITADO_LIMITACION_FISICA",
  "SOBREVIVIENTES MINAS ANTIPERSONALES",
  "DISCAPACIDAD LIMITACION AUDITIVA",
  "DISCAPACIDAD LIMITACION VISUAL",
  "DISCAPACIDAD_MENTAL",
  "EN CONDICION DE DISCAPACIDAD",
  "ROM",
  "NEGRITUDES",
  "EMPRENDEDOR",
  "INDIGENAS",
  "PROC_REINTEGRACION / REINCORPORACION",
  "INDIGENAS_DESPLAZADOS_POR_LA VIOLENCIA",
  "INDIGENAS DESPLAZADOS POR LA VIOLENCIA CABEZA DE FAMILIA",
  "INPEC",
  "JOVENES_VULNERABLES",
  "SOLDADOS_CAMPESINOS",
  "TERCERA_EDAD",
  "CAMPESINO",
  "NINGUNA",
  "PEQUEÑO PRODUCTOR",
  "OTRO",
];

const educationLevels = [
  "Ninguno",
  "Primaria",
  "Básica",
  "Profesional",
  "Postgrado",
];

interface AddAssociateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  asociacionId: number;
}

export const AddAssociateModal = ({
  isOpen,
  onOpenChange,
  asociacionId,
}: AddAssociateModalProps) => {
  const [formData, setFormData] = useState<ParticipanteRequest>({
    numeroDocumento: "",
    nombreCompleto: "",
    genero: "Masculino",
    correoElectronico: "",
    numeroContacto: 0,
    asociacions: [],
    tipoPoblacion: "GENERAL",
    edad: 0,
    nivelEstudio: "Ninguno",
    locale: "es",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const participanteData = {
        ...formData,
      };

      // Asumimos que createAsociado devuelve el participante recién creado con su ID
      await createAsociado(participanteData, asociacionId);

      addToast({
        title: "Éxito",
        description: "El asociado se ha agregado correctamente.",
        color: "success",
      });
      onOpenChange(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: "Ha ocurrido un error al agregar el asociado.",
        color: "danger",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} size="4xl" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Nuevo Asociado
            </ModalHeader>
            <ModalBody>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                id="addAssociateForm"
                onSubmit={handleSubmit}
              >
                <Input
                  id="numeroDocumento"
                  label="Número de Documento"
                  labelPlacement="outside"
                  name="numeroDocumento"
                  type="text"
                  value={formData.numeroDocumento}
                  onChange={handleChange}
                />
                <Input
                  id="nombreCompleto"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  name="nombreCompleto"
                  type="text"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                />
                <RadioGroup
                  label="Género"
                  name="genero"
                  orientation="horizontal"
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <Radio value="Masculino">Masculino</Radio>
                  <Radio value="Femenino">Femenino</Radio>
                </RadioGroup>
                <Input
                  id="correoElectronico"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  name="correoElectronico"
                  type="email"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                />
                <Input
                  id="numeroContacto"
                  label="Número de Contacto"
                  labelPlacement="outside"
                  name="numeroContacto"
                  type="text"
                  value={formData.numeroContacto.toString()}
                  onChange={handleChange}
                />
                <Select
                  label="Tipo de Población"
                  labelPlacement="outside"
                  name="tipoPoblacion"
                  selectedKeys={
                    formData.tipoPoblacion ? [formData.tipoPoblacion] : []
                  }
                  onChange={handleChange}
                >
                  {populationTypes.map((type) => (
                    <SelectItem key={type}>{type}</SelectItem>
                  ))}
                </Select>
                <Input
                  id="edad"
                  label="Edad"
                  labelPlacement="outside"
                  name="edad"
                  type="number"
                  value={formData.edad.toString()}
                  onChange={handleChange}
                />
                <Select
                  label="Nivel de Estudio"
                  labelPlacement="outside"
                  name="nivelEstudio"
                  selectedKeys={
                    formData.nivelEstudio ? [formData.nivelEstudio] : []
                  }
                  onChange={handleChange}
                >
                  {educationLevels.map((level) => (
                    <SelectItem key={level}>{level}</SelectItem>
                  ))}
                </Select>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" form="addAssociateForm" type="submit">
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
