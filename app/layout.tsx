import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexo Digital | Ideas claras. Soluciones que avanzan.",
  description:
    "Apps, sitios web, inteligencia artificial, automatización, CRM y chatbots diseñados para transformar la forma en que trabajas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
