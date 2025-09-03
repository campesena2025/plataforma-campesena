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
                  defaultValue={associate.documentNumber}
                  id="documentNumber"
                  label="Número de Documento"
                  labelPlacement="outside"
                  name="documentNumber"
                  type="text"
                />
                <Input
                  defaultValue={associate.fullName}
                  id="fullName"
                  label="Nombre Completo"
                  labelPlacement="outside"
                  name="fullName"
                  type="text"
                />
                <RadioGroup
                  defaultValue={associate.gender}
                  label="Género"
                  orientation="horizontal"
                >
                  <Radio value="Masculino">Masculino</Radio>
                  <Radio value="Femenino">Femenino</Radio>
                  <Radio value="No binario">No binario</Radio>
                </RadioGroup>
                <Input
                  defaultValue={associate.email}
                  id="email"
                  label="Correo Electrónico"
                  labelPlacement="outside"
                  name="email"
                  type="email"
                />
                <Input
                  defaultValue={associate.contactNumber}
                  id="contactNumber"
                  label="Número de Contacto"
                  labelPlacement="outside"
                  name="contactNumber"
                  type="text"
                />
                <Select
                  defaultSelectedKeys={[associate.participantType]}
                  label="Tipo de Participante"
                  labelPlacement="outside"
                  name="participantType"
                >
                  <SelectItem
                    key="Representante legal"
                    value="Representante legal"
                  >
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
                  defaultSelectedKeys={[associate.populationType]}
                  label="Tipo de Población"
                  labelPlacement="outside"
                  name="populationType"
                >
                  {populationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  defaultValue={associate.age.toString()}
                  id="age"
                  label="Edad"
                  labelPlacement="outside"
                  name="age"
                  type="number"
                />
                <Select
                  defaultSelectedKeys={[associate.educationLevel]}
                  label="Nivel de Estudio"
                  labelPlacement="outside"
                  name="educationLevel"
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
