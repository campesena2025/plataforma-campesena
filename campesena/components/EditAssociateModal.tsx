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

export const EditAssociateModal = ({ isOpen, onOpenChange, associate }) => {
  if (!associate) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar Asociado
            </ModalHeader>
            <ModalBody>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  type="text"
                  label="Número de Documento"
                  labelPlacement="outside"
                  defaultValue={associate.documentNumber}
                />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  defaultValue={associate.fullName}
                />
                <RadioGroup
                  label="Género"
                  orientation="horizontal"
                  defaultValue={associate.gender}
                >
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
                  defaultValue={associate.email}
                />
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="text"
                  label="Número de Contacto"
                  labelPlacement="outside"
                  defaultValue={associate.contactNumber}
                />
                <Select
                  label="Tipo de Participante"
                  name="participantType"
                  labelPlacement="outside"
                  defaultSelectedKeys={[associate.participantType]}
                >
                  <SelectItem key="Representante legal" value="Representante legal">
                    Representante legal
                  </SelectItem>
                  <SelectItem
                    key="Participante Asociacion"
                    value="Participante Asociacion"
                  >
                    Participante Asociación
                  </SelectItem>
                  <SelectItem key="Otro" value="Otro">
                    Otro
                  </SelectItem>
                </Select>
                <Select
                  label="Tipo de Población"
                  name="populationType"
                  labelPlacement="outside"
                  defaultSelectedKeys={[associate.populationType]}
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
                  defaultValue={associate.age.toString()}
                />
                <Select
                  label="Nivel de Estudio"
                  name="educationLevel"
                  labelPlacement="outside"
                  defaultSelectedKeys={[associate.educationLevel]}
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
