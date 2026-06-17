import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baby Shower | Juan José Carreño Marmolejo",
  description:
    "Te invitamos a celebrar la llegada de nuestro amado Juan José. Acompañanos en este día tan especial.",
  keywords: [
    "baby shower",
    "Juan José",
    "Carreño Marmolejo",
    "Bucaramanga",
    "bebé",
  ],
  openGraph: {
    title: "Baby Shower | Juan José Carreño Marmolejo",
    description:
      "Con inmensa alegría esperamos la llegada de nuestro amado Juan José. Queremos compartir contigo este momento tan especial.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-beige-50 text-foreground antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
