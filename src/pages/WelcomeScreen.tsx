import { Typography } from "@mui/material";

export default function WelcomeScreen() {
   
    return (
        <Typography
                variant="h5"
                
                sx={{
                    fontWeight: 700,
                    textAlign:"center",
                    m:2
                }}
            >
                Welcome To ERP AI Assistant
            </Typography>
    );
}