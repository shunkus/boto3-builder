import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#337ab7",
    },
    secondary: {
      main: "#FF9900",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
      },
    },
    MuiButton: {
      contained: {
        borderRadius: 0,
        boxShadow: "none",
      },
      containedSecondary: {
        color: "#FFFFFF",
      },
    },
    MuiAccordion: {
      root: {
        boxShadow: "none",
      },
    },
  },
});
