import React from "react";
import Script from "next/script";
import "./globals.css";
import "../styles/index.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 2. Replace the <script> tag with the <Script> component */}
        <Script
          id="rocket-script" // An ID is required for the component
          strategy="afterInteractive" // Loads the script after the page is interactive
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Flunamatey4493back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.5"
        />
      </body>
    </html>
  );
}
