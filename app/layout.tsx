import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SideNav } from "@/components/SideNav";
import { GlobalScroll } from "@/components/GlobalScroll";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Shubham Kumar",
  description: "Portfolio of Shubham Kumar, Full Stack Developer, Backend Engineer",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: "/favicon-blue.ico",
      href: "/favicon-blue.ico",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: "/favicon-white.ico",
      href: "/favicon-white.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} min-h-full flex flex-col font-sans antialiased`}>
        <ThemeProvider>
          <GlobalScroll />
          <SideNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
