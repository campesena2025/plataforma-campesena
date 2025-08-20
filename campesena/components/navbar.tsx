"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import UserMenu from "./UserMenu";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import logo_sena from "@/assets/imgs/Campesena_Logo.png";

export const NavbarApp = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navegador = (ruta: string) => {
    router.push(ruta);
    setIsMenuOpen(false);
  };

  return (
    <Navbar
      isBordered={true}
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarBrand as="li" className="">
          <NextLink className="flex justify-start items-center" href="/">
            <Image alt="Logo Sena" src={logo_sena} width={200} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {status === "authenticated" &&
            siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium flex items-center",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.icon}
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          {/* Mostrar botón de login solo si el usuario NO está autenticado */}
          {status !== "authenticated" ? (
            <NavbarItem>
              <Button
                color="success"
                variant="flat"
                onPress={() => router.push("/login")}
              >
                Iniciar sesión
              </Button>
            </NavbarItem>
          ) : (
            <UserMenu />
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ThemeSwitch />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {status === "authenticated" &&
            siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <Link
                  size="lg"
                  onClick={(e) => {
                    e.preventDefault();
                    navegador(item.href);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </Link>
              </NavbarMenuItem>
            ))}
          {/* Mostrar UserMenu solo si está autenticado, si no mostrar botón de login */}
          {status === "authenticated" ? (
            <UserMenu />
          ) : (
            <Button
              color="success"
              variant="flat"
              onPress={() => router.push("/login")}
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
