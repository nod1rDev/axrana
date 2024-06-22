import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./Redux/Provider";
import Main from "./Components/Main";
import Prodected from "./Components/Protected";
import Alertt from "./Components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apm Zaplata",
  manifest: "/manifest.json",
  description: "Apm Zaplata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body id="body" className={`max-w-[1580px] mx-auto ${inter.className}`}>
          <Prodected>
            <Main>{children}</Main>
          </Prodected>
          <Alertt />
        </body>
      </html>
    </StoreProvider>
  );
}
