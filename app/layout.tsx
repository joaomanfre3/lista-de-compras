import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Lista de Compras",
  description:
    "Sua lista de compras de supermercado, organizada por corredor. Marque o que já pegou, ajuste quantidades e não esqueça nada. Funciona offline.",
  applicationName: "Lista de Compras",
  openGraph: {
    title: "Lista de Compras",
    description: "Lista de supermercado organizada por corredor. Offline e sem cadastro.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
