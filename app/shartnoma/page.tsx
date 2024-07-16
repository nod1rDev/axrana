"use client";
import React, { useEffect, useState } from "react";
import Shartnoma from "./Components/Shartnoma";
import { useSelector } from "react-redux";
import Topshiriq from "../topshiriq/Components/Topshiriq";

function page() {
  const admin = useSelector((e: any) => e.auth.admin);
  return <>{admin ? <Shartnoma /> : <Topshiriq />}</>;
}

export default page;
