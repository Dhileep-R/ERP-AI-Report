import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

import App from "./App";
import theme from "./theme";

createRoot(document.getElementById("root")!).render(
    <>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                autoHideDuration={1000}
            >
                <App />
            </SnackbarProvider>

        </ThemeProvider>
    </>
);