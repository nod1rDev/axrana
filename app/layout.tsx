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
          <link
            href="https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          id="body"
          className={`max-w-full mx-auto ${inter.className}`}
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          <Prodected>
            <Main>{children}</Main>
          </Prodected>

          {/* <div className="w-full h-full flex justify-center items-center text-[30px] font-bold">
            Sayt Vaqtinchalik ishlamayapti
          </div> */}
          <Alertt />
        </body>
      </html>
    </StoreProvider>
  );
}
