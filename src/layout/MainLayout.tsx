import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header />
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#F5F7FA",
          }}
        >
          {/* Outlet takes remaining space */}
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}