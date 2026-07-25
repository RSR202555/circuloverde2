import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Círculo Verde: Produtos e Serviços",
  description:
    "Soluções avançadas para irrigação de precisão. Tecnologia KREBS a serviço da produtividade e sustentabilidade no campo brasileiro.",
  icons: {
    icon: [
      { url: "/Prancheta 2.png" },
      { url: "/icon.png" }
    ],
    shortcut: "/Prancheta 2.png",
    apple: "/Prancheta 2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link rel="icon" href="/Prancheta 2.png" sizes="any" />
        <link rel="apple-touch-icon" href="/Prancheta 2.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} bg-background font-body text-on-surface`}
      >
        {children}
      </body>
    </html>
  );
}
