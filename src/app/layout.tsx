// src/app/layout.tsx

'use client';

import { MantineProvider } from '@mantine/core';
import Navbar from '@/components/Navbar'; 
import '@mantine/core/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="light">
          <Navbar /> {/* ✅ Ensure it's placed here */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
