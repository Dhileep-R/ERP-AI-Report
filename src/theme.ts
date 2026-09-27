import "@fontsource/manrope";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontWeight: 400,
    },

    body2: {
      fontWeight: 400,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#2563EB",
    },
    background: {
      default: "#F4F7FB",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E5E7EB",
        },
      },
    },
  },
});

export default theme;