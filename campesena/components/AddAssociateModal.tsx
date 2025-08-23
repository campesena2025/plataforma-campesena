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
  Textarea,
  RadioGroup,
  Radio,
} from "@heroui/react";

const populationTypes = [
  "Campesino",
  "Indigena",
  "Raizal",
  "Afrocolombiano",
  "Otro",
];

const educationLevels = [
  "Primaria",
  "Bachillerato",
  "Técnico",
  "Tecnólogo",
  "Profesional",
  "Especialización",
  "Maestría",
  "Doctorado",
];

export const AddAssociateModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Agregar Nuevo Asociado
            </ModalHeader>
            <ModalBody>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  type="text"
                  label="Número de Documento"
                  labelPlacement="outside"
                />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Nombre Completo"
                  labelPlacement="outside"
                />
                <RadioGroup label="Género" orientation="horizontal">
                  <Radio value="Masculino">Masculino</Radio>
                  <Radio value="Femenino">Femenino</Radio>
                  <Radio value="No binario">No binario</Radio>
                </RadioGroup>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                />
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="text"
                  label="Número de Contacto"
                  labelPlacement="outside"
                />
                <Select
                  label="Tipo de Participante"
                  name="participantType"
                  labelPlacement="outside"
                >
                  <SelectItem key="representante-legal" value="Representante legal">
                    Representante legal
                  </SelectItem>
                  <SelectItem
                    key="participante-asociacion"
                    value="Participante Asociacion"
                  >
                    Participante Asociación
                  </SelectItem>
                  <SelectItem key="otro" value="Otro">
                    Otro
                  </SelectItem>
                </Select>
                <Select
                  label="Tipo de Población"
                  name="populationType"
                  labelPlacement="outside"
                >
                  {populationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  label="Edad"
                  labelPlacement="outside"
                />
                <Select
                  label="Nivel de Estudio"
                  name="educationLevel"
                  labelPlacement="outside"
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
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
