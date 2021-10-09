import React from "react";
import styled from "styled-components";
import { isLoggedInVar, darkModeVar } from "../src/apollo";

export default function Login() {
  const Conatiner = styled.div`
    background-color: ${({ theme }) => theme.background};
  `;

  const Title = styled.h1`
    color: ${({ theme }) => theme.fontColor};
  `;

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Log in now</button>
      <br />
      <button onClick={() => darkModeVar(true)}>To Dark</button>
      <button onClick={() => darkModeVar(false)}>To Light</button>
    </div>
  );
}
