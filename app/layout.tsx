import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Cambié el título para que en la pestaña de Vercel y tu video diga "JOTACE Soluciones" en lugar de "Create Next App"
export const metadata: Metadata = {
  title: "JOTACE Soluciones | Panel",
  description: "Plataforma de servicios de clases, tareas y cursos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Aquí aplicamos el fondo oscuro (bg-slate-950) y el texto claro (text-slate-200) a toda la página */}
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-200">
        {children}
      </body>
    </html>
  );
}