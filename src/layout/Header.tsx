import {
  AppBar,
  Box,
IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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

        <IconButton
          color="inherit"
           onClick={() => navigate('/')}
        >

          <AccountCircleIcon
          />
          </IconButton>

      </Toolbar>
    </AppBar>
  );
}