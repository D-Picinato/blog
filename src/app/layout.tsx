import '@/styles/globals.css';

import CustomModal from '@/components/custom-modal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - PW III',
  description:
    'Blog simples para as aulas de PW III do curso AMS (Articulação da Formação Médio Superior) - Desenvolvimento de Sistemas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex justify-center">
        {children}
        <CustomModal />
      </body>
    </html>
  );
}
