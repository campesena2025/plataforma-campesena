'use client';
import React, { useEffect, useState } from 'react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/solid';
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
} from '@heroui/react';
import * as XLSX from 'xlsx';

import { AddAssociateModal } from './AddAssociateModal';
import { EditAssociateModal } from './EditAssociateModal';
import { UploadAssociatesModal } from './UploadAssociatesModal';

import { Participante } from '@/types/participante';
import { useAsociacionesStore } from '@/store/asociaciones.store';
import { setRepresentanteLegalId } from '@/services/asociaciones.service';
import { Asociacion } from '@/types/asociacion';

interface AsociadosTableProps {
  initialAssociates: Participante[];
  asociacion: number;
}

export default function AsociadosTable({ initialAssociates, asociacion }: AsociadosTableProps) {
  const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onOpenChange: onUploadOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();

  // Leemos los asociados directamente del store para que la tabla sea reactiva a los cambios.
  const associates =
    useAsociacionesStore((state) => state.data.find((a) => a.id === asociacion))?.participantes ?? initialAssociates;

  const [selectedAssociate, setSelectedAssociate] = useState<Participante | null>(null);

  const [asociacionSelected] = useState<Asociacion>(
    useAsociacionesStore((state) => state.data.find((a) => a.id === asociacion))!,
  );

  const [legalRepresentativeId, setLegalRepresentativeId] = useState<number>(
    asociacionSelected.representanteLegal?.id || 0,
  );

  const [representanteLegalData, setRepresentanteLegalData] = useState<Participante | null>(
    asociacionSelected.representanteLegal || null,
  );

  const handleSetLegalRepresentative = (associateId: number) => {
    setRepresentanteLegalId(asociacionSelected.documentId, associateId);
    setLegalRepresentativeId(associateId);
    setRepresentanteLegalData(associates.find((a) => a.id === associateId) || null);
  };

  const handleEdit = (associate: Participante) => {
    setSelectedAssociate(associate);
    onEditOpen();
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(associates);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Asociados');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'asociados.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => { }, [legalRepresentativeId]);

  const renderCell = (item: Participante, columnKey: React.Key): React.ReactNode => {
    const cellValue = item[columnKey as keyof Participante];

    switch (columnKey) {
      case 'actions':
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
                  key={'1'}
                  startContent={<PencilIcon className="w-4 h-4" />}
                  onPress={() => handleEdit(item)}
                >
                  Editar
                </DropdownItem>
                <DropdownItem key={'2'} color="danger" startContent={<TrashIcon className="w-4 h-4" />}>
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
        if (typeof cellValue === 'object' && cellValue !== null && !React.isValidElement(cellValue)) {
          return null;
        }

        return cellValue as React.ReactNode;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4 space-x-2">
        <Button color="primary" startContent={<UserPlusIcon className="w-5 h-5" />} onPress={onAddOpen}>
          Crear Asociado
        </Button>
        <Button color="primary" startContent={<UserPlusIcon className="w-5 h-5" />} onPress={onUploadOpen}>
          Cargue Asociados
        </Button>
        <Button color="primary" startContent={<ArrowDownTrayIcon className="w-5 h-5" />} onPress={handleDownloadExcel}>
          Descargar Excel
        </Button>
      </div>
      <>
        {representanteLegalData && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">
              Representante Legal:
              {` ${representanteLegalData.nombreCompleto}`}
            </h2>
            <small className="text-blue-700">
              Telefono:{' '}
              {` ${representanteLegalData.numeroContacto} | Correo: ${representanteLegalData.correoElectronico}`}
            </small>
          </div>
        )}
      </>
      <div className="overflow-x-auto">
        <Table aria-label="Tabla de asociados" className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableColumn key="tipoDocumento">Tipo documento</TableColumn>
            <TableColumn key="numeroDocumento">Documento</TableColumn>
            <TableColumn key="nombreCompleto">Nombre Completo</TableColumn>
            <TableColumn key="genero">Género</TableColumn>
            <TableColumn key="correoElectronico">Correo Electrónico</TableColumn>
            <TableColumn key="numeroContacto">Número de Contacto</TableColumn>
            <TableColumn key="tipoPoblacion">Tipo de Población</TableColumn>
            <TableColumn key="edad">Edad</TableColumn>
            <TableColumn key="nivelEstudio">Nivel de Estudio</TableColumn>
            <TableColumn key="actions">Acciones</TableColumn>
          </TableHeader>
          <TableBody items={associates}>
            {(item) => (
              <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AddAssociateModal asociacionId={asociacion} isOpen={isAddOpen} onOpenChange={onAddOpenChange} />
      <UploadAssociatesModal asociacionId={asociacion} isOpen={isUploadOpen} onOpenChange={onUploadOpenChange} />
      <EditAssociateModal
        asociacionId={asociacion}
        associate={selectedAssociate}
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
      />
    </div>
  );
}
