import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./components/providers";
import { HeroUIProvider } from "@heroui/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </Providers>
    </div>
  );
}
