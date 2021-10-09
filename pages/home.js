import React from "react";
import { darkModeVar, isLoggedInVar } from "../src/apollo";

export default function Home() {
  return (
    <div>
      <h1>Homescreen</h1>
      <button onClick={() => isLoggedInVar(false)}>Welcome home</button>
      <br />
      <button onClick={() => darkModeVar(true)}>To Dark</button>
      <button onClick={() => darkModeVar(false)}>To Light</button>
    </div>
  );
}
