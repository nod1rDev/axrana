"use client";
import React from "react";
import Header from "./Header";

function Main({ children }: { children: any }) {
  return (
    <>
      <div className="grid grid-cols-[300px_1fr] min-h-full min-w-full mx-auto">
        <Header/>
        <div className="">{children}</div>
      </div>
    </>
  );
}

export default Main;
