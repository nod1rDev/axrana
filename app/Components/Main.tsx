"use client";
import React from "react";
import Header from "./Header";

function Main({ children }: { children: any }) {
  return (
    <>
      <div className="flex flex-col max-w-[1580px] mx-auto">
        <Header />
        <div className="p-4 mt-16">{children}</div>
      </div>
    </>
  );
}

export default Main;
