import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "../src/apollo";
import "../styles/globals.css";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/styles";

function MyApp({ Component, pageProps }) {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
