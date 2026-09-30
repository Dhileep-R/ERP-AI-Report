import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        background:
          "linear-gradient(90deg,#1E3A8A,#2563EB)",
        zIndex: 1300,
      }}
    >
      <Toolbar>

        {/* Logo */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            ERP AI Assistant
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Go to Landing Page" arrow>
          <IconButton
            color="inherit"
            onClick={() => navigate("/")}
            aria-label="Go to landing page"
            sx={{
              ml: 1,
              borderRadius: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.18)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <HomeRoundedIcon />
          </IconButton>
        </Tooltip>

      </Toolbar>
    </AppBar>
  );
}