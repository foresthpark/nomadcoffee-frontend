import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { darkModeVar, isLoggedInVar } from "../src/apollo";
import Home from "./home";
import Login from "./login";
const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";
export default function AppHome() {
  const [logged, setLogged] = useState(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);

  useEffect(() => {
    if (typeof window !== "undefined" && window?.localStorage) {
      return isLoggedInVar(Boolean(window.localStorage.getItem(TOKEN)));
    }
    return isLoggedInVar(false);
  }, [isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined" && window?.localStorage) {
      return darkModeVar(
        Boolean(localStorage.getItem(DARK_MODE) === "enabled")
      );
    }
    return darkModeVar(false);
  }, [isDarkMode]);

  return <div>{isLoggedIn ? <Home /> : <Login />}</div>;
}
