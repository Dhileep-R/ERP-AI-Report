
import React from "react";
import { Box, Typography, Button, ButtonBase } from "@mui/material";
import {
  SmartToy,
  TrendingUp,
  ReceiptLong,
  AutoAwesome,
  ArrowForward,
  ShowChart,
  BarChart,
  PieChart,
  QueryStats,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const sampleQuestions = [
  {
    text: "Analyze the sales trend over time",
    icon: <ShowChart />,
  },
  {
    text: "What percentage of sales comes from each customer?",
    icon: <PieChart />,
  },
 {
  text: "Analyze all invoices, sales totals, and most-invoiced parts",
  icon: <ReceiptLong />,
},
{
  text: "Identify top customers by sales, explain their contribution",
  icon: <QueryStats />,
},
];

const features = [
  {
    icon: <SmartToy />,
    title: "AI-powered answers",
    description: "Ask questions in plain English.",
  },
  {
    icon: <TrendingUp />,
    title: "Sales analytics",
    description: "Understand your business data.",
  },
  {
    icon: <ReceiptLong />,
    title: "Live ERP data",
    description: "Explore your latest records.",
  },
  {
    icon: <AutoAwesome />,
    title: "Visual reports",
    description: "Discover insights through charts.",
  },
];

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSampleQuestion = (question: string) => {
    navigate("/erp/ai-report", {
      state: { samplePrompt: question },
    });
  };

  const handleTryNow = () => {
    navigate("/erp/ai-report");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        color: "#F8FAFC",
        background: `
          radial-gradient(
            ellipse at 90% 10%,
            rgba(59, 130, 246, 0.22),
            transparent 38%
          ),
          radial-gradient(
            ellipse at 0% 100%,
            rgba(124, 58, 237, 0.15),
            transparent 35%
          ),
          linear-gradient(135deg, #0B1228 0%, #111D42 55%, #172F69 100%)
        `,
        px: { xs: 2, sm: 3, md: 5 },
        py: { xs: 2, md: 2.5 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: { xs: 3, md: 1 },
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: "linear-gradient(135deg, #60A5FA, #818CF8)",
            boxShadow: "0 8px 28px rgba(96, 165, 250, 0.25)",
          }}
        >
          <SmartToy sx={{ fontSize: 27, color: "#FFFFFF" }} />
        </Box>

        <Typography
          sx={{
            fontSize: { xs: 17, sm: 20 },
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          ERP AI Assistant
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: 20,
            border: "1px solid rgba(148, 163, 184, 0.2)",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#4ADE80",
              boxShadow: "0 0 10px rgba(74, 222, 128, 0.5)",
            }}
          />
          <Typography sx={{ fontSize: 12, color: "#CBD5E1" }}>
            AI-powered ERP insights
          </Typography>
        </Box>
      </Box>

      {/* Main two-column layout */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1320,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "0.95fr 1.05fr",
          },
          alignItems: "center",
          gap: { xs: 4, md: 7, lg: 10 },
          py: { xs: 2, md: 1 },
        }}
      >
        {/* LEFT: Hero content */}
        <Box
          sx={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              mb: 2.5,
              borderRadius: 20,
              border: "1px solid rgba(129, 140, 248, 0.28)",
              background: "rgba(99, 102, 241, 0.10)",
            }}
          >
            <AutoAwesome sx={{ fontSize: 16, color: "#A5B4FC" }} />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#C7D2FE",
                letterSpacing: 0.3,
              }}
            >
              YOUR SMARTER ERP EXPERIENCE
            </Typography>
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: 38,
                sm: 48,
                md: 52,
                lg: 62,
              },
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: { xs: "-1.5px", md: "-2.8px" },
              mb: 2.5,
            }}
          >
            Your ERP data.
            <Box
              component="span"
              sx={{
                display: "block",
                background:
                  "linear-gradient(90deg, #60A5FA 0%, #A5B4FC 60%, #C4B5FD 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Smarter insights.
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 500,
              color: "#C0CCE1",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.8,
              mb: 3.5,
            }}
          >
            Create a sales invoice, then ask the AI to analyze sales again
            and check whether your updated data appears in its report.
          </Typography>

          <Button
            onClick={handleTryNow}
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              px: 3.5,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 700,
              color: "#FFFFFF",
              background: "linear-gradient(100deg, #3B82F6, #6366F1)",
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.24)",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "linear-gradient(100deg, #2563EB, #4F46E5)",
                transform: "translateY(-2px)",
                boxShadow: "0 14px 35px rgba(59, 130, 246, 0.35)",
              },
            }}
          >
            Try Now
          </Button>

          {/* Compact feature cards */}
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                sm: "1fr 1fr",
              },
              gap: 1.5,
              mt: 4,
            }}
          >
            {features.map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.25,
                  p: 1.5,
                  borderRadius: "13px",
                  border: "1px solid rgba(148, 163, 184, 0.13)",
                  background: "rgba(255, 255, 255, 0.035)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.07)",
                    borderColor: "rgba(129, 140, 248, 0.35)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#93C5FD",
                    display: "flex",
                    mt: 0.15,
                    "& svg": { fontSize: 21 },
                  }}
                >
                  {feature.icon}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: "#F1F5F9",
                      mb: 0.35,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#AAB9D2",
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* RIGHT: Sample question panel */}
        <Box
          sx={{
            minWidth: 0,
            position: "relative",
            p: { xs: 2, sm: 3, md: 3.5 },
            borderRadius: { xs: "20px", md: "24px" },
            border: "1px solid rgba(148, 163, 184, 0.2)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.16)",
            backdropFilter: "blur(16px)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "12%",
              right: "12%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(147,197,253,0.65), transparent)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 19, md: 22 },
                fontWeight: 750,
                letterSpacing: "-0.5px",
              }}
            >
              Try asking your ERP AI
            </Typography>

            <Box
              sx={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: "11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#BFDBFE",
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
              }}
            >
              <SmartToy sx={{ fontSize: 23 }} />
            </Box>
          </Box>

          <Typography
            sx={{
              color: "#AAB9D2",
              fontSize: 13,
              mb: 2.5,
            }}
          >
            Choose a question to get started.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
            {sampleQuestions.map((question, index) => (
              <ButtonBase
                key={question.text}
                onClick={() => handleSampleQuestion(question.text)}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  gap: 1.5,
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 1.5, sm: 1.7 },
                  minHeight: 52,
                  borderRadius: "12px",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  background: "rgba(37, 56, 105, 0.48)",
                  color: "#E8EEF9",
                  transition: "all 0.18s ease",
                  "&:hover": {
                    background: "rgba(59, 130, 246, 0.17)",
                    borderColor: "rgba(96, 165, 250, 0.55)",
                    transform: "translateX(3px)",
                  },
                  "&:focus-visible": {
                    outline: "2px solid #93C5FD",
                    outlineOffset: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#93C5FD",
                    display: "flex",
                    flexShrink: 0,
                    "& svg": { fontSize: 21 },
                  }}
                >
                  {question.icon}
                </Box>

                <Typography
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    fontSize: { xs: 12.5, sm: 14 },
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {question.text}
                </Typography>

                <ArrowForward
                  sx={{
                    flexShrink: 0,
                    fontSize: 19,
                    color: "#93C5FD",
                  }}
                />
              </ButtonBase>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 2.5,
              px: 1.5,
              py: 1.25,
              borderRadius: "10px",
              background: "rgba(15, 23, 42, 0.25)",
            }}
          >
            <AutoAwesome
              sx={{ color: "#A5B4FC", fontSize: 18, flexShrink: 0 }}
            />
            <Typography
              sx={{
                color: "#AAB9D2",
                fontSize: 11.5,
                lineHeight: 1.6,
              }}
            >
              Select any prompt to open the assistant with your question
              ready to use.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;