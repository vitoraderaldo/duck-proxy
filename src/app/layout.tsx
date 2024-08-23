import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/header/header";
import StoreProvider from "@/global-state/boilerplate/store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proxy Search",
  description: "A seamless way to search the web using DuckDuckGo API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StoreProvider>
            <NextUIProvider>
              <Header />
              {children}
            </NextUIProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
