import React from "react";

import {
    Box,
    Typography,
    Button,
} from "@mui/material";

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

    return (
        <Box
            sx={{
                width: "100%",
                height: "100dvh",
                minHeight: 0,

                display: "flex",

                overflow: "hidden",

                background: "#f8fafc",

                // Prevent page scrolling
                position: "fixed",
                inset: 0,
            }}
        >
            {/* =====================================================
                LEFT - BRAND / AI SECTION
            ====================================================== */}

            <Box
                sx={{
                    width: {
                        xs: "100%",
                        md: "55%",
                    },

                    height: "100%",

                    position: "relative",

                    overflow: "hidden",

                    display: {
                        xs: "none",
                        md: "flex",
                    },

                    flexDirection: "column",

                    justifyContent: "center",

                    px: {
                        md: 7,
                        lg: 10,
                    },

                    color: "#fff",

                    background:
                        "linear-gradient(135deg, #0f172a 0%, #172554 45%, #2563eb 100%)",
                }}
            >
                {/* =================================================
                    BACKGROUND GLOW 1
                ================================================== */}

                <Box
                    sx={{
                        position: "absolute",

                        width: 420,
                        height: 420,

                        borderRadius: "50%",

                        background:
                            "radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)",

                        top: -150,
                        right: -100,

                        pointerEvents: "none",
                    }}
                />

                {/* =================================================
                    BACKGROUND GLOW 2
                ================================================== */}

                <Box
                    sx={{
                        position: "absolute",

                        width: 350,
                        height: 350,

                        borderRadius: "50%",

                        background:
                            "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",

                        bottom: -120,
                        left: -100,

                        pointerEvents: "none",
                    }}
                />

                {/* =================================================
                    MAIN LEFT CONTENT
                ================================================== */}

                <Box
                    sx={{
                        position: "relative",

                        zIndex: 2,

                        maxWidth: 620,

                        width: "100%",
                    }}
                >
                    {/* =================================================
                        LOGO
                    ================================================== */}

                    <Box
                        sx={{
                            display: "flex",

                            alignItems: "center",

                            gap: 1.5,

                            mb: {
                                md: 4,
                                lg: 5,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,

                                borderRadius: 2.5,

                                display: "flex",

                                alignItems: "center",

                                justifyContent: "center",

                                background:
                                    "linear-gradient(135deg,#60a5fa,#818cf8)",

                                boxShadow:
                                    "0 10px 30px rgba(59,130,246,0.35)",
                            }}
                        >
                            <SmartToy
                                sx={{
                                    fontSize: 28,

                                    color: "#fff",
                                }}
                            />
                        </Box>

                        <Typography
                            sx={{
                                fontSize: 20,

                                fontWeight: 700,

                                letterSpacing: "-0.3px",

                                color: "#fff",
                            }}
                        >
                            ERP AI Assistant
                        </Typography>
                    </Box>

                    {/* =================================================
                        HEADING
                    ================================================== */}

                    <Typography
                        sx={{
                            fontSize: {
                                md: 42,
                                lg: 52,
                            },

                            lineHeight: 1.1,

                            fontWeight: 800,

                            letterSpacing: "-1.5px",

                            mb: 2.5,

                            color: "#fff",
                        }}
                    >
                        Your ERP data.
                        <br />

                        <Box
                            component="span"
                            sx={{
                                background:
                                    "linear-gradient(90deg,#60a5fa,#a78bfa)",

                                WebkitBackgroundClip: "text",

                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Smarter insights.
                        </Box>
                    </Typography>

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <Typography
                        sx={{
                            fontSize: 17,

                            lineHeight: 1.7,

                            color:
                                "rgba(255,255,255,0.72)",

                            maxWidth: 520,

                            mb: {
                                md: 3.5,
                                lg: 5,
                            },
                        }}
                    >
                        Ask questions about your ERP data and get
                        intelligent answers, analytics, and visual
                        insights in seconds.
                    </Typography>

                    {/* =================================================
                        FEATURES
                    ================================================== */}

                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                md: "1fr",
                                lg: "1fr 1fr",
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

                {/* =================================================
                    BOTTOM TEXT
                ================================================== */}

                <Typography
                    sx={{
                        position: "absolute",

                        bottom: 25,

                        left: {
                            md: 56,
                            lg: 80,
                        },

                        fontSize: 12,

                        color:
                            "rgba(255,255,255,0.45)",

                        letterSpacing: "0.5px",
                    }}
                >
                    AI • ERP • Analytics
                </Typography>
            </Box>

            {/* =====================================================
                RIGHT - TRY NOW SECTION
            ====================================================== */}

            <Box
                sx={{
                    flex: 1,

                    height: "100%",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    position: "relative",

                    overflow: "hidden",

                    background:
                        "radial-gradient(circle at center, #ffffff 0%, #f8fafc 55%, #eef2ff 100%)",
                }}
            >
                {/* =================================================
                    SUBTLE BACKGROUND GLOW
                ================================================== */}

                <Box
                    sx={{
                        position: "absolute",

                        width: 420,
                        height: 420,

                        borderRadius: "50%",

                        background:
                            "radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)",

                        top: "50%",

                        left: "50%",

                        transform: "translate(-50%, -50%)",

                        pointerEvents: "none",
                    }}
                />

                {/* =================================================
                    TRY NOW BUTTON
                ================================================== */}

                <Button
                    onClick={() => navigate("/erp/")}
                    variant="contained"
                    endIcon={
                        <ArrowForward
                            sx={{
                                fontSize: 24,
                            }}
                        />
                    }
                    sx={{
                        position: "relative",

                        zIndex: 2,

                        minWidth: {
                            xs: 200,
                            sm: 230,
                            lg: 250,
                        },

                        height: {
                            xs: 58,
                            sm: 64,
                            lg: 68,
                        },

                        px: {
                            xs: 4,
                            sm: 5,
                            lg: 5.5,
                        },

                        borderRadius: "18px",

                        textTransform: "none",

                        fontSize: {
                            xs: 17,
                            sm: 18,
                            lg: 19,
                        },

                        fontWeight: 800,

                        letterSpacing: "-0.2px",

                        color: "#fff",

                        background:
                            "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #6366f1 100%)",

                        boxShadow:
                            "0 18px 45px rgba(37,99,235,0.28), 0 6px 18px rgba(79,70,229,0.18)",

                        transition:
                            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                        "&::before": {
                            content: '""',

                            position: "absolute",

                            inset: 1,

                            borderRadius: "17px",

                            border:
                                "1px solid rgba(255,255,255,0.22)",

                            pointerEvents: "none",
                        },

                        "& .MuiButton-endIcon": {
                            marginLeft: 1,

                            transition:
                                "transform 0.3s ease",
                        },

                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #1d4ed8 0%, #4338ca 50%, #4f46e5 100%)",

                            transform:
                                "translateY(-4px) scale(1.015)",

                            boxShadow:
                                "0 24px 55px rgba(37,99,235,0.35), 0 10px 25px rgba(79,70,229,0.22)",
                        },

                        "&:hover .MuiButton-endIcon": {
                            transform:
                                "translateX(5px)",
                        },

                        "&:active": {
                            transform:
                                "translateY(-1px) scale(1)",
                        },
                    }}
                >
                    Try Now
                </Button>
            </Box>
        </Box>
    );
}


/* ================================================================
   FEATURE COMPONENT
================================================================ */

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

                gap: 1.5,

                p: 1.5,

                borderRadius: 2.5,

                background:
                    "rgba(255,255,255,0.07)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                transition:
                    "all 0.2s ease",

                "&:hover": {
                    background:
                        "rgba(255,255,255,0.11)",

                    transform:
                        "translateY(-2px)",
                },
            }}
        >
            {/* Icon */}

            <Box
                sx={{
                    width: 38,

                    height: 38,

                    borderRadius: 2,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    flexShrink: 0,

                    background:
                        "rgba(96,165,250,0.15)",

                    color: "#93c5fd",
                }}
            >
                {icon}
            </Box>

            {/* Text */}

            <Box>
                <Typography
                    sx={{
                        fontSize: 13,

                        fontWeight: 700,

                        color: "#fff",

                        mb: 0.2,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    sx={{
                        fontSize: 11,

                        color:
                            "rgba(255,255,255,0.55)",

                        lineHeight: 1.4,
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>
    );
}