'use client';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from '@heroui/react';

import { useAuth } from '@/app/auth-provider';

export default function UserMenu() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
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
          <p className="font-semibold">{user?.username}</p>
          <p className="font-normal text-xs text-default-500">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Configuración</DropdownItem>
        <DropdownItem key="help">Ayuda</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
