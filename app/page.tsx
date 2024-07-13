"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { puJWT } from "./Redux/AuthSlice";

import Shartnoma from "./shartnoma/Components/Shartnoma";
import Topshiriq from "./topshiriq/Components/Topshiriq";
function Page() {
  const dispatch = useDispatch();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const admin = useSelector((s: any) => s.auth.admin);
  React.useEffect(() => {
    return () => {
      dispatch(puJWT(JWT));
    };
  }, []);

  window.onbeforeunload = function (e: any) {
    if (typeof e == "undefined") {
      e = window.event;
    }

    dispatch(puJWT(sessionStorage.getItem("token")));
  };
  return admin ? <Shartnoma /> : <Topshiriq />;
}

export default Page;
