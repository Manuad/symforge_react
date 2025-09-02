import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Symforge | Soluciones en la Nube y Microservicios",
  description: "Soluciones tecnológicas innovadoras para tu negocio.",
  keywords: ["SymForge", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
  authors: [{ name: "SymForge SolutionS " }],
  openGraph: {
    title: "SymForge | Soluciones en la Nube y Microservicios",
    description: "Soluciones tecnológicas innovadoras para tu negocio.",
    url: "https://symforgesolutions.com",
    siteName: "SymForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SymForge - Soluciones Tecnológicas",
    description: "Soluciones tecnológicas innovadoras para tu negocio.",
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
