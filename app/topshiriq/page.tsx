"use client";
import React from "react";
import Topshiriq from "./Components/Topshiriq";
import { useSelector } from "react-redux";
import Shartnoma from "../shartnoma/Components/Shartnoma";

function page() {
  const admin = useSelector((s: any) => s.auth.admin);
  return <>{!admin ? <Topshiriq /> : <Shartnoma />}</>;
}

export default page;
