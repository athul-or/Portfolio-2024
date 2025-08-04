import type { Metadata } from "next";
import { Archivo } from 'next/font/google';
import "./globals.css";
import LenisWrapper from "@/components/LenisWrapper";
import CustomCursor from "@/components/CustomCursor";

const archivo = Archivo({
  display: 'swap',
  weight: 'variable',
  subsets: ["latin"],
  variable: '--font-archivo'
})

export const metadata: Metadata = {
  title: "Athul OR",
  description: "Created with Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white ${archivo.variable} font-sans`}>
        <CustomCursor />
        <LenisWrapper>{children}</LenisWrapper>
        </body>
    </html>
  );
}
