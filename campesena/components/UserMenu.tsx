"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";

import getAllGeografia, { getAllMunicipios, getAllVeredas } from "@/services/geografia.service";

export default function UserMenu() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    //const data = await getAllGeografia();

    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Perfil de usuario" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Usuario</p>
          <p className="font-normal text-xs text-default-500">
            usuario@email.com
          </p>
        </DropdownItem>
        <DropdownItem key="settings">Configuración</DropdownItem>
        <DropdownItem key="help">Ayuda</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onClick={() => handleLogout()}
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
