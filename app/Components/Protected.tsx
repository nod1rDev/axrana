"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import Login from "./Login";
import { getAuth, loginAuth } from "../Api/Apis";
import { setUser } from "../Redux/AuthSlice";

function Prodected({ children }: { children: any }) {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const [user, setUserr] = useState<boolean>(false);

  const JWT = useSelector((state: any) => state.auth.JWT);
  useEffect(() => {
    const getUser = async () => {
      const userr = await getAuth(JWT);

      dispatch(setUser(userr));
      setUserr(userr.success);
    };

    if (
      JWT != "out" &&
      JWT !== null &&
      JWT !== "null" &&
      JWT !== "undefined" &&
      JWT !== undefined
    ) {
      getUser();
    }
  }, [JWT]);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setloading(false);
      }, 10);
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <LinearProgress color="info" />
      </div>
    );
  } else {
    if (
      JWT != "out" &&
      JWT !== null &&
      JWT !== "null" &&
      JWT !== "undefined" &&
      JWT !== undefined
    ) {
      return <div>{children}</div>;
    } else {
      return <Login />;
    }
  }
}

export default Prodected;
