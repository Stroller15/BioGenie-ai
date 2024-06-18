import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';


import "./globals.css";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";


export const metadata: Metadata = {
  title: "twtBio-AI",
  description: "Twitter bio generator by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, "font-sans")}>
        <DotPattern width={40} height={40} className="-z-10 "/>
        {children}
      </body>
    </html>
  );
}
