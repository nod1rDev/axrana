import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./Redux/Provider";
import Main from "./Components/Main";
import Prodected from "./Components/Protected";
import Alertt from "./Components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milliy_Gvardiya",
  manifest: "/manifest.json",
  description: "Milliy_Gvardiya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/icon-192x192.png" />
        </head>
        <body id="body" className={`max-w-full mx-auto ${inter.className}`}>
          <Prodected>
            <Main>{children}</Main>
          </Prodected>
          <Alertt />
        </body>
      </html>
    </StoreProvider>
  );
}
