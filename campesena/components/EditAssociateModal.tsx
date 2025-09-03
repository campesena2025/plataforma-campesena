import React from "react";
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

export const EditAssociateModal = ({ isOpen, onOpenChange, associate }) => {
  if (!associate) return null;

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
                  defaultValue={associate.numeroDocumento}
                  id="numeroDocumento"
                  label="Número de Documento"
                  labelPlacement="outside"
                  name="numeroDocumento"
                  type="text"
                />
                <Input
                  defaultValue={associate.nombreCompleto}
                  id="nombreCompleto"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  name="nombreCompleto"
                  type="text"
                />
                <RadioGroup
                  defaultValue={associate.genero}
                  label="Género"
                  orientation="horizontal"
                >
                  <Radio value="Masculino">Masculino</Radio>
                  <Radio value="Femenino">Femenino</Radio>
                  <Radio value="No binario">No binario</Radio>
                </RadioGroup>
                <Input
                  defaultValue={associate.correoElectronico}
                  id="correoElectronico"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  name="correoElectronico"
                  type="email"
                />
                <Input
                  defaultValue={associate.numeroContacto.toString()}
                  id="numeroContacto"
                  label="Número de Contacto"
                  labelPlacement="outside"
                  name="numeroContacto"
                  type="text"
                />
                <Select
                  defaultSelectedKeys={[associate.tipoPoblacion]}
                  label="Tipo de Población"
                  labelPlacement="outside"
                  name="tipoPoblacion"
                >
                  {populationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  defaultValue={associate.edad.toString()}
                  id="edad"
                  label="Edad"
                  labelPlacement="outside"
                  name="edad"
                  type="number"
                />
                <Select
                  defaultSelectedKeys={[associate.nivelEstudio]}
                  label="Nivel de Estudio"
                  labelPlacement="outside"
                  name="nivelEstudio"
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
              <Button color="primary" onPress={onClose}>
                Guardar Cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
