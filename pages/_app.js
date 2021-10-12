import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar, client } from "../src/apollo";
import "../styles/globals.css";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/styles";

function MyApp({ Component, pageProps }) {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
