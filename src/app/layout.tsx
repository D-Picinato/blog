import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog - PW III",
  description:
    "Blog simples para as aulas de PW III do curso AMS (Articulação da Formação Médio Superior) - Desenvolvimento de Sistemas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
