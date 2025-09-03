import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { NavbarVisibility } from "@/components/NavbarVisibility";
import Breadcrumbs from "@/components/breadCrumb";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <HeroUIProvider>
            <ToastProvider placement="top-center" toastOffset={80} />
            <div className="relative flex flex-col h-screen">
              <NavbarVisibility />
              <main className="container mx-auto max-w-7xl pt-1 px-6 flex-grow">
                <Breadcrumbs titulo={""} />
                {children}
              </main>
            </div>
          </HeroUIProvider>
        </Providers>
      </body>
    </html>
  );
}
