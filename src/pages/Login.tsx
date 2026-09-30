import React from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  SmartToy,
  TrendingUp,
  ReceiptLong,
  AutoAwesome,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleTryNow = () => {
    // Update this route if your AI Report page uses a different path.
    navigate("/erp/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 4, md: 6 },
        background:
          "linear-gradient(135deg, #0f172a 0%, #172554 48%, #2563eb 100%)",
        color: "#fff",
      }}
    >
      {/* Background glow effects */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 260, md: 440 },
          height: { xs: 260, md: 440 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.34), transparent 70%)",
          top: { xs: -100, md: -150 },
          right: { xs: -100, md: -80 },
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: { xs: 250, md: 380 },
          height: { xs: 250, md: 380 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(129,140,248,0.25), transparent 70%)",
          bottom: { xs: -100, md: -140 },
          left: { xs: -100, md: -80 },
          pointerEvents: "none",
        }}
      />

      {/* Centered main content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 920,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Brand */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #60a5fa, #818cf8)",
              boxShadow: "0 10px 30px rgba(59,130,246,0.35)",
            }}
          >
            <SmartToy sx={{ fontSize: 30, color: "#fff" }} />
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 19, md: 22 },
              fontWeight: 750,
              letterSpacing: "-0.4px",
              color: "#fff",
            }}
          >
            ERP AI Assistant
          </Typography>
        </Box>

        {/* Main heading */}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 36, sm: 46, md: 62 },
            lineHeight: 1.08,
            fontWeight: 800,
            letterSpacing: { xs: "-1px", md: "-2px" },
            mb: 2.5,
            color: "#fff",
          }}
        >
          Your ERP data.
          <br />
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #60a5fa, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Smarter insights.
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            maxWidth: 650,
            mx: "auto",
            mb: 3,
            fontSize: { xs: 15, sm: 17 },
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.76)",
          }}
        >
          Ask questions about your ERP data and get intelligent answers,
          analytics, and visual insights in seconds.
        </Typography>

        {/* Try Now button */}
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          onClick={handleTryNow}
          sx={{
            px: 4,
            py: 1.5,
            mb: { xs: 4, md: 5 },
            borderRadius: "12px",
            textTransform: "none",
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(90deg, #3b82f6, #818cf8)",
            boxShadow: "0 8px 25px rgba(59,130,246,0.35)",
            transition: "all 0.25s ease",
            "&:hover": {
              background: "linear-gradient(90deg, #2563eb, #6366f1)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 30px rgba(59,130,246,0.45)",
            },
          }}
        >
          Try Now
        </Button>

        {/* Feature cards */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 780,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 1.5,
          }}
        >
          <Feature
            icon={<TrendingUp />}
            title="Smart Analytics"
            description="Turn ERP data into useful insights."
          />
          <Feature
            icon={<ReceiptLong />}
            title="Sales Intelligence"
            description="Explore orders, customers and parts."
          />
          <Feature
            icon={<AutoAwesome />}
            title="AI Assistant"
            description="Ask questions using natural language."
          />
          <Feature
            icon={<SmartToy />}
            title="Interactive Reports"
            description="Understand your data visually."
          />
        </Box>
      </Box>

      {/* Footer */}
      <Typography
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 11,
          color: "rgba(255,255,255,0.48)",
          letterSpacing: "0.8px",
        }}
      >
        AI • ERP • ANALYTICS
      </Typography>
    </Box>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "left",
        gap: 1.5,
        p: 2,
        borderRadius: 3,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.11)",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s ease",
        "&:hover": {
          background: "rgba(255,255,255,0.12)",
          borderColor: "rgba(147,197,253,0.4)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "rgba(96,165,250,0.16)",
          color: "#93c5fd",
          "& svg": { fontSize: 23 },
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            mb: 0.4,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: "rgba(255,255,255,0.62)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
