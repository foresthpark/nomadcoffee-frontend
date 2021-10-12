import React from "react";
import { darkModeVar, isLoggedInVar, logUserOut } from "../src/apollo";

export default function Home() {
  return (
    <div>
      <h1>Welcome! We did it!</h1>
      <button onClick={() => logUserOut()}>Log out</button>
      <br />
      <button onClick={() => darkModeVar(true)}>To Dark</button>
      <button onClick={() => darkModeVar(false)}>To Light</button>
    </div>
  );
}
