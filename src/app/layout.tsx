import React from "react";
import Script from "next/script";
import { Poppins, JetBrains_Mono } from "next/font/google"; // 1. Import JetBrains Mono
import "./globals.css";
import "../styles/index.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-poppins",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"], // Use '400' for regular, '700' for bold
  variable: "--font-jetbrains-mono",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Next.js with Tailwind CSS",
  description: "A boilerplate project with Next.js and Tailwind CSS",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Add the font variables to the <html> tag
    <html
      lang="en"
      className={`${poppins.variable} ${jetbrains_mono.variable}`}
    >
      <body>
        {children}
        <Script id="rocket-script" strategy="afterInteractive" src="..." />
      </body>
    </html>
  );
}
