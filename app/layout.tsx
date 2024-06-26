import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./Redux/Provider";
import Main from "./Components/Main";
import Prodected from "./Components/Protected";
import Alertt from "./Components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axrana",
  manifest: "/manifest.json",
  description: "Axrana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
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
