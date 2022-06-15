import "@fontsource/roboto";
import "../styles/globals.css";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "../styles/theme";
import { usePanelbear } from "@panelbear/panelbear-nextjs";

function MyApp({ Component, pageProps }) {
  usePanelbear("Bmz33rDWRMc");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
