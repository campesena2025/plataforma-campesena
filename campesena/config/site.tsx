import React from "react";
import { UserGroupIcon, ChartBarIcon } from "@heroicons/react/24/solid";

export type SiteConfig = typeof siteConfig;

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export const siteConfig = {
  name: "Plataforma instructores campesena",
  description: "Plataforma de registro de instructores campesena.",
  navItems: [
    {
      label: "Asociaciones",
      href: "/asociaciones",
      icon: <UserGroupIcon className="h-5 w-5 mr-1 text-green-700" />,
    },

    {
      label: "Reportes",
      href: "/reportes",
      icon: <ChartBarIcon className="h-5 w-5 mr-1 text-green-700" />,
    },
    // {
    //   label: "Administración",
    //   href: "/admin",
    //   icon: <Cog6ToothIcon className="h-5 w-5 mr-1 text-gray-800" />,
    // },
  ] as NavItem[],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
