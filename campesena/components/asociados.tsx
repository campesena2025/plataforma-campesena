"use client";
import React, { useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import { AddAssociateModal } from "./AddAssociateModal";
import { EditAssociateModal } from "./EditAssociateModal";

type Associate = {
  id: number;
  documentNumber: string;
  fullName: string;
  gender: string;
  email: string;
  contactNumber: string;
  participantType: string;
  populationType: string;
  age: number;
  educationLevel: string;
};

export default function AsociadosTable({
  initialAssociates,
}: {
  initialAssociates: Associate[];
}) {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [associates, setAssociates] = useState<Associate[]>(initialAssociates);
  const [legalRepresentativeId, setLegalRepresentativeId] = useState<number>(1);
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(
    null,
  );

  const handleSetLegalRepresentative = (associateId: number) => {
    setLegalRepresentativeId(associateId);
    setAssociates(
      associates.map((associate) =>
        associate.id === associateId
          ? { ...associate, participantType: "Representante legal" }
          : { ...associate, participantType: "Participante Asociacion" },
      ),
    );
  };

  const handleEdit = (associate: Associate) => {
    setSelectedAssociate(associate);
    onEditOpen();
  };

  const renderCell = (item: Associate, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Associate];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <EllipsisVerticalIcon className="text-default-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"1"}
                  startContent={<PencilIcon className="w-4 h-4" />}
                  onPress={() => handleEdit(item)}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                  key={"2"}
                  color="danger"
                  startContent={<TrashIcon className="w-4 h-4" />}
                >
                  Borrar
                </DropdownItem>
                <DropdownItem
                  key={""}
                  isDisabled={legalRepresentativeId === item.id}
                  startContent={<UserPlusIcon className="w-4 h-4" />}
                  onClick={() => handleSetLegalRepresentative(item.id)}
                >
                  Seleccionar como Representante Legal
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button
          color="primary"
          startContent={<UserPlusIcon className="w-5 h-5" />}
          onPress={onAddOpen}
        >
          Agregar Asociado
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table
          aria-label="Tabla de asociados"
          className="min-w-full divide-y divide-gray-200"
        >
          <TableHeader>
            <TableColumn key="documentNumber">Documento</TableColumn>
            <TableColumn key="fullName">Nombre Completo</TableColumn>
            <TableColumn key="gender">Género</TableColumn>
            <TableColumn key="email">Correo Electrónico</TableColumn>
            <TableColumn key="contactNumber">Número de Contacto</TableColumn>
            <TableColumn key="participantType">
              Tipo de Participante
            </TableColumn>
            <TableColumn key="populationType">Tipo de Población</TableColumn>
            <TableColumn key="age">Edad</TableColumn>
            <TableColumn key="educationLevel">Nivel de Estudio</TableColumn>
            <TableColumn key="actions">Acciones</TableColumn>
          </TableHeader>
          <TableBody items={associates}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AddAssociateModal isOpen={isAddOpen} onOpenChange={onAddOpenChange} />
      <EditAssociateModal
        associate={selectedAssociate}
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
      />
    </div>
  );
}
