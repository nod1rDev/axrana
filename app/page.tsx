"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { puJWT } from "./Redux/AuthSlice";
import Othcot from "./Components/Othcot";
function Page() {
  const dispatch = useDispatch();
  const JWT = useSelector((state: any) => state.auth.JWT);

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
  return <Othcot />;
}

export default Page;
