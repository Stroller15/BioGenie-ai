import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';


import "./globals.css";
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";


export const metadata: Metadata = {
  title: "BioGenie | Linkedin bio generator",
  description: "Linkedin bio generator by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, "font-sans ")}>
        <GridPattern width={60} height={60} className="-z-10 opacity-60"/>
        {children}
      </body>
    </html>
  );
}
