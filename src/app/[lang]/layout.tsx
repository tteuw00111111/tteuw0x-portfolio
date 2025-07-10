import React from "react";
import Script from "next/script";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { i18n, Locale } from "@/i18n.config";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-poppins",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "tteuw0x | Portfolio",
  description: "",
  icons: {
    icon: [{ url: "images/favicon.ico", type: "image/x-icon" }],
  },
};
interface RootLayoutProps {
  children: React.ReactNode;
  blurClass?: string; // Add this prop
}
export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      lang={lang}
      className={`${poppins.variable} ${jetbrains_mono.variable}`}
    >
      <body>
        {children}
        <Script id="rocket-script" strategy="afterInteractive" src="..." />
      </body>
    </html>
  );
}
