"use client";
import React, { useEffect, useState } from "react";
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

import { Participante } from "@/types/participante";

export default function AsociadosTable({
  initialAssociates,
}: {
  initialAssociates: Participante[];
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
  const [associates, setAssociates] =
    useState<Participante[]>(initialAssociates);
  const [legalRepresentativeId, setLegalRepresentativeId] = useState<number>(1);
  const [selectedAssociate, setSelectedAssociate] =
    useState<Participante | null>(null);

  useEffect(() => {
    setAssociates(initialAssociates);
  }, [initialAssociates]);

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

  const handleEdit = (associate: Participante) => {
    setSelectedAssociate(associate);
    onEditOpen();
  };

  const updatedHandler = () => {
    // actualizar la tabla con respecto a store de asociaciones
    setAssociates([...associates]);
  };

  const renderCell = (
    item: Participante,
    columnKey: React.Key,
  ): React.ReactNode => {
    const cellValue = item[columnKey as keyof Participante];

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
                  key="set-legal-rep"
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
        // Evita renderizar objetos directamente, que es la causa del error.
        if (
          typeof cellValue === "object" &&
          cellValue !== null &&
          !React.isValidElement(cellValue)
        ) {
          return null;
        }

        return cellValue as React.ReactNode;
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
            <TableColumn key="numeroDocumento">Documento</TableColumn>
            <TableColumn key="nombreCompleto">Nombre Completo</TableColumn>
            <TableColumn key="genero">Género</TableColumn>
            <TableColumn key="correoElectronico">
              Correo Electrónico
            </TableColumn>
            <TableColumn key="numeroContacto">Número de Contacto</TableColumn>
            <TableColumn key="tipoPoblacion">Tipo de Población</TableColumn>
            <TableColumn key="edad">Edad</TableColumn>
            <TableColumn key="nivelEstudio">Nivel de Estudio</TableColumn>
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
        onUpdated={updatedHandler}
      />
    </div>
  );
}
