import type { Metadata } from "next";
import { Geist_Mono, Inter, Saira_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sairaCondensed = Saira_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Chaveamento da Copa do Mundo 2026",
  description:
    "Acompanhe o mata-mata da Copa do Mundo 2026 em tempo real: placares ao vivo, escalações e a trajetória rumo ao título.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "dark h-full",
        inter.variable,
        geistMono.variable,
        sairaCondensed.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
