import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../src/apollo";
import Home from "./home";
import Login from "./login";

export default function AppHome() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return <div>{isLoggedIn ? <Home /> : <Login />}</div>;
}
