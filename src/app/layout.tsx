import '@/styles/globals.css';

import type { Metadata } from 'next';
import CustomModal from '@/components/custom-modal';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Blog PW',
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
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
