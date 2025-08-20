"use client";
import { usePathname } from "next/navigation";

import { NavbarApp } from "@/components/navbar";

export function NavbarVisibility() {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return <NavbarApp />;
}
