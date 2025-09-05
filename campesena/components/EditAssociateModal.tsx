import React, { useState, useEffect } from "react";
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

import { updateAsociado } from "@/services/asociado.service";
import { useAsociacionesStore } from "@/store/asociaciones.store";
import { ParticipanteRequest } from "@/types/participante";

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

export const EditAssociateModal = ({
  isOpen,
  onOpenChange,
  associate,
  onUpdated,
}) => {
  const [formData, setFormData] = useState<Partial<ParticipanteRequest>>({});
  const invalidateAsociaciones = useAsociacionesStore(
    (state) => state.invalidate,
  );

  useEffect(() => {
    if (associate) {
      setFormData({
        numeroDocumento: associate.numeroDocumento,
        nombreCompleto: associate.nombreCompleto,
        genero: associate.genero,
        correoElectronico: associate.correoElectronico,
        numeroContacto: associate.numeroContacto,
        tipoPoblacion: associate.tipoPoblacion,
        edad: associate.edad,
        nivelEstudio: associate.nivelEstudio,
      });
    }
  }, [associate]);

  if (!associate) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      genero: value as "Masculino" | "Femenino",
    }));
  };

  const handleSubmit = async (onClose: () => void) => {
    if (!formData.nombreCompleto || !formData.numeroDocumento) {
      addToast({
        title: "Error de validación",
        description: "Nombre completo y número de documento son requeridos.",
        color: "danger",
      });

      return;
    }

    try {
      await updateAsociado(associate.documentId, formData);
      addToast({
        title: "Asociado actualizado",
        description: "El asociado ha sido actualizado correctamente.",
        color: "success",
      });
      invalidateAsociaciones();
      onClose();
    } catch (error) {
      addToast({
        title: "Error",
        description: "Hubo un error al actualizar el asociado.",
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
              Editar Asociado
            </ModalHeader>
            <ModalBody>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  id="numeroDocumento"
                  label="Número de Documento"
                  labelPlacement="outside"
                  name="numeroDocumento"
                  type="text"
                  value={formData.numeroDocumento || ""}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  id="nombreCompleto"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  name="nombreCompleto"
                  type="text"
                  value={formData.nombreCompleto || ""}
                  onChange={handleChange}
                />
                <RadioGroup
                  label="Género"
                  orientation="horizontal"
                  value={formData.genero || ""}
                  onValueChange={handleRadioChange}
                >
                  <Radio value="Masculino">Masculino</Radio>
                  <Radio value="Femenino">Femenino</Radio>
                  <Radio value="No binario">No binario</Radio>
                </RadioGroup>
                <Input
                  id="correoElectronico"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  name="correoElectronico"
                  type="email"
                  value={formData.correoElectronico || ""}
                  onChange={handleChange}
                />
                <Input
                  id="numeroContacto"
                  label="Número de Contacto"
                  labelPlacement="outside"
                  name="numeroContacto"
                  type="text"
                  value={formData.numeroContacto?.toString() || ""}
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
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  id="edad"
                  label="Edad"
                  labelPlacement="outside"
                  name="edad"
                  type="number"
                  value={formData.edad?.toString() || ""}
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
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </Select>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={() => handleSubmit(onClose)}>
                Guardar Cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
