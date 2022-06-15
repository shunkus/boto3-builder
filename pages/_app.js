import "@fontsource/roboto";
import "../styles/globals.css";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "../styles/theme";
import { useCronitor } from "@cronitorio/cronitor-rum-nextjs";

function MyApp({ Component, pageProps }) {
  useCronitor("699b8760d747641ccf6a13251dd77d3c");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
