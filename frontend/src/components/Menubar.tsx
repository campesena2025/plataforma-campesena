"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as HeroLink,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  href?: string;
  icon: React.ReactNode;
  children?: Omit<MenuItem, 'icon'>[];
  adminOnly?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "Asociaciones",
    icon: <UserGroupIcon className="h-5 w-5" />,
    children: [
      { name: "Registrar Nueva", href: "/asociaciones/nueva" },
      { name: "Listado", href: "/asociaciones" },
      { name: "Ficha Integral", href: "/asociaciones/ficha" }
    ]
  },
  {
    name: "Diagnóstico",
    icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
    children: [
      { name: "Aplicar Diagnóstico", href: "/diagnostico/aplicar" },
      { name: "Plantillas", href: "/diagnostico/plantillas", adminOnly: true }
    ]
  },
  {
    name: "Plan de Acción",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    children: [
      { name: "Crear Plan", href: "/plan-accion/nuevo" },
      { name: "Seguimiento", href: "/plan-accion/seguimiento" }
    ]
  },
  {
    name: "Modelo de Negocio",
    icon: <CurrencyDollarIcon className="h-5 w-5" />,
    children: [
      { name: "Canvas", href: "/modelo-negocio/canvas" },
      { name: "Costos e Inversiones", href: "/modelo-negocio/costos" },
      { name: "Proyecciones", href: "/modelo-negocio/proyecciones" },
      { name: "Portafolio", href: "/modelo-negocio/portafolio" },
      { name: "Plan de Mercadeo", href: "/modelo-negocio/mercadeo" }
    ]
  },
  {
    name: "Flujo de Caja",
    icon: <ChartPieIcon className="h-5 w-5" />,
    children: [
      { name: "Registrar Movimientos", href: "/flujo-caja/movimientos" },
      { name: "Resúmenes Mensuales", href: "/flujo-caja/resumenes" }
    ]
  },
  {
    name: "Reportes",
    icon: <ChartPieIcon className="h-5 w-5" />,
    children: [
      { name: "Comparativos", href: "/reportes/comparativos" },
      { name: "Avance de Planes", href: "/reportes/avance" },
      { name: "Inversión por Sector", href: "/reportes/inversion" }
    ]
  },
  {
    name: "Administración",
    icon: <Cog6ToothIcon className="h-5 w-5" />,
    adminOnly: true,
    children: [
      { name: "Plantillas", href: "/admin/plantillas" },
      { name: "Configuración", href: "/admin/configuracion" }
    ]
  }
];

// Extiende el tipo de usuario de sesión para incluir 'role'
interface SessionUserWithRole {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}


export default function Menubar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = (session?.user as SessionUserWithRole)?.role === "admin";

  useEffect(() => {
    const applyTheme = (theme: "dark" | "light") => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      }
    };
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        if (e.newValue === "dark" || e.newValue === "light") {
          applyTheme(e.newValue);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogin = () => router.push("/login");
  const handleLogout = async () => await signOut({ redirect: true, callbackUrl: "/" });
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(newTheme === "dark");
  };


  // Menú principal para escritorio
  const renderDesktopMenu = () => (
    <NavbarContent className="hidden sm:flex gap-2" justify="center">
      {menuItems.map((item) => {
        if (item.adminOnly && !isAdmin) return null;
        if (item.children) {
          return (
            <Dropdown key={item.name}>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={<svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/></svg>}
                  radius="sm"
                  variant="light"
                >
                  <span className="flex items-center gap-1">{item.icon}{item.name}</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label={item.name} itemClasses={{ base: "gap-2" }}>
                {item.children.map((child) => {
                  if (child.adminOnly && !isAdmin) return null;
                  return (
                    <DropdownItem key={child.name} as={HeroLink} href={child.href || "#"}>
                      {child.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          );
        }
        return (
          <NavbarItem key={item.name}>
            <HeroLink href={item.href || "#"} className="flex items-center gap-1">
              {item.icon}
              <span>{item.name}</span>
            </HeroLink>
          </NavbarItem>
        );
      })}
    </NavbarContent>
  );

  // Menú móvil
  const renderMobileMenu = () => (
    <NavbarMenu>
      {menuItems.map((item) => {
        if (item.adminOnly && !isAdmin) return null;
        if (item.children) {
          return [
            <NavbarMenuItem key={item.name} className="font-bold opacity-80 mt-2 mb-1">
              <span className="flex items-center gap-2">{item.icon}{item.name}</span>
            </NavbarMenuItem>,
            ...item.children.map((child) => {
              if (child.adminOnly && !isAdmin) return null;
              return (
                <NavbarMenuItem key={child.name} className="pl-8">
                  <HeroLink href={child.href || "#"}>{child.name}</HeroLink>
                </NavbarMenuItem>
              );
            })
          ];
        }
        return (
          <NavbarMenuItem key={item.name}>
            <HeroLink href={item.href || "#"} className="flex items-center gap-1">
              {item.icon}
              <span>{item.name}</span>
            </HeroLink>
          </NavbarMenuItem>
        );
      })}
    </NavbarMenu>
  );

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
      {/* Toggle y logo móvil */}
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}  />
      </NavbarContent>
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <HeroLink href="/" className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-inherit">Rutas Campesena</span>
          </HeroLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Menú escritorio */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <HeroLink href="/" className="flex items-center gap-2">
            <HomeIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-inherit">Rutas Campesena</span>
          </HeroLink>
        </NavbarBrand>
        {status === "authenticated" && renderDesktopMenu()}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {status !== "authenticated" && (
            <HeroLink href="#" onClick={handleLogin}>Iniciar Sesión</HeroLink>
          )}
        </NavbarItem>
        <NavbarItem>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </NavbarItem>
        {status === "loading" ? (
          <NavbarItem>
            <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 animate-spin ml-4" />
          </NavbarItem>
        ) : status === "authenticated" ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={session?.user?.name || "Usuario"}
                size="sm"
                src={session?.user?.image || undefined}
                icon={<UserIcon />}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Acciones de perfil" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesión iniciada como</p>
                <p className="font-semibold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : null}
      </NavbarContent>

      {/* Menú móvil */}
      {renderMobileMenu()}
    </Navbar>
  );
}