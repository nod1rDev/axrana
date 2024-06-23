"use client";
import React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-end m-6">
        <Button
          onClick={() => router.push("/shartnoma/add")}
          variant="contained"
        >
          {"Qo'shish"}
        </Button>
      </div>
    </div>
  );
}

export default page;
