import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "lightGray",
};

export const darkTheme = {
  fontColor: "lightGray",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
${reset}
  body {
    background-color: ${({ theme }) => theme.bgColor};
  }
`;
