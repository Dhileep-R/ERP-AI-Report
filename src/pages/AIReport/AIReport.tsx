import { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    Send,
    SmartToy,
    Person,
} from "@mui/icons-material";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

interface ChartSeries {
    dataKey: string;
    label?: string;
    axisLabel?: string;
    valueFormat?: string;
    valuePrefix?: string;
    valueSuffix?: string;
}

interface ChartData {
    chartType: "bar" | "line" | "pie";
    meta?: {
        title?: string;
        description?: string;
    };
    xKey?: string;
    nameKey?: string;
    valueKey?: string;
    series?: ChartSeries[];
    data?: Record<string, any>[];
}

interface Message {
    id: number;
    type: "user" | "ai";
    message: string;
    chart?: ChartData | null;
}
const PIE_COLORS = [
    "#1976D2", // Blue
    "#2E7D32", // Green
    "#ED6C02", // Orange
    "#9C27B0", // Purple
    "#D32F2F", // Red
    "#00838F", // Teal
    "#6D4C41", // Brown
    "#5E35B1", // Deep purple
];

function ERPChart({
    chart,
}: {
    chart: ChartData;
}) {

    if (!chart || !chart.data || chart.data.length === 0) {
        return null;
    }

    const series =
        chart.series || [];

    const formatValue = (
        value: any,
        seriesItem?: ChartSeries
    ) => {

        if (value === null || value === undefined) {
            return "";
        }

        let formatted =
            Number(value).toLocaleString("en-IN");

        if (
            seriesItem?.valuePrefix
        ) {
            formatted =
                seriesItem.valuePrefix +
                formatted;
        }

        if (
            seriesItem?.valueSuffix
        ) {
            formatted =
                formatted +
                seriesItem.valueSuffix;
        }

        return formatted;
    };


    // ========================================================
    // BAR CHART
    // ========================================================

    if (chart.chartType === "bar") {

        const xKey =
            chart.xKey || "";

        return (
            <Box
                sx={{
                    width: "100%",
                    height: 320,
                    mt: 1.5,
                    p: 1,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                }}
            >

                {chart.meta?.title && (
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            mb: 0.5,
                            color: "#101828",
                        }}
                    >
                        {chart.meta.title}
                    </Typography>
                )}

                {chart.meta?.description && (
                    <Typography
                        sx={{
                            fontSize: "11px",
                            color: "#667085",
                            mb: 1,
                        }}
                    >
                        {chart.meta.description}
                    </Typography>
                )}

                <ResponsiveContainer
                    width="100%"
                    height="85%"
                >

                    <BarChart
                        data={chart.data}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey={xKey}
                            tick={{
                                fontSize: 10,
                            }}
                        />

                        <YAxis
                            tick={{
                                fontSize: 10,
                            }}
                        />

                        <Tooltip
                            formatter={(
                                value,
                                name,
                                props
                            ) => {

                                const currentSeries =
                                    series.find(
                                        (item) =>
                                            item.dataKey ===
                                            props.dataKey
                                    );

                                return [
                                    formatValue(
                                        value,
                                        currentSeries
                                    ),
                                    name,
                                ];
                            }}
                        />

                        {series.length > 1 && (
                            <Legend />
                        )}

                        {series.map(
                            (item) => (
                                <Bar
                                    key={
                                        item.dataKey
                                    }
                                    dataKey={
                                        item.dataKey
                                    }
                                    name={
                                        item.label ||
                                        item.dataKey
                                    }
                                    radius={[
                                        4,
                                        4,
                                        0,
                                        0,
                                    ]}
                                />
                            )
                        )}

                    </BarChart>

                </ResponsiveContainer>

            </Box>
        );
    }


    // ========================================================
    // LINE CHART
    // ========================================================

    if (chart.chartType === "line") {

        const xKey =
            chart.xKey || "";

        return (
            <Box
                sx={{
                    width: "100%",
                    height: 320,
                    mt: 1.5,
                    p: 1,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                }}
            >

                {chart.meta?.title && (
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            mb: 0.5,
                            color: "#101828",
                        }}
                    >
                        {chart.meta.title}
                    </Typography>
                )}

                {chart.meta?.description && (
                    <Typography
                        sx={{
                            fontSize: "11px",
                            color: "#667085",
                            mb: 1,
                        }}
                    >
                        {chart.meta.description}
                    </Typography>
                )}

                <ResponsiveContainer
                    width="100%"
                    height="85%"
                >

                    <LineChart
                        data={chart.data}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey={xKey}
                            tick={{
                                fontSize: 10,
                            }}
                        />

                        <YAxis
                            tick={{
                                fontSize: 10,
                            }}
                        />

                        <Tooltip
                            formatter={(
                                value,
                                name
                            ) => {

                                const currentSeries =
                                    series.find(
                                        (item) =>
                                            item.dataKey ===
                                            name
                                    );

                                return [
                                    formatValue(
                                        value,
                                        currentSeries
                                    ),
                                    currentSeries?.label ||
                                    name,
                                ];
                            }}
                        />

                        {series.length > 1 && (
                            <Legend />
                        )}

                        {series.map(
                            (item) => (
                                <Line
                                    key={
                                        item.dataKey
                                    }
                                    type="monotone"
                                    dataKey={
                                        item.dataKey
                                    }
                                    name={
                                        item.label ||
                                        item.dataKey
                                    }
                                    strokeWidth={2}
                                    dot={{
                                        r: 3,
                                    }}
                                />
                            )
                        )}

                    </LineChart>

                </ResponsiveContainer>

            </Box>
        );
    }


    // ========================================================
    // PIE CHART
    // ========================================================

    if (chart.chartType === "pie") {

        return (
            <Box
                sx={{
                    width: "100%",
                    height: 320,
                    mt: 1.5,
                    p: 1,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                }}
            >

                {chart.meta?.title && (
                    <Typography
                        sx={{
                            fontSize: "14px",
                            fontWeight: 700,
                            mb: 0.5,
                            color: "#101828",
                        }}
                    >
                        {chart.meta.title}
                    </Typography>
                )}

                {chart.meta?.description && (
                    <Typography
                        sx={{
                            fontSize: "11px",
                            color: "#667085",
                            mb: 1,
                        }}
                    >
                        {chart.meta.description}
                    </Typography>
                )}

                <ResponsiveContainer
                    width="100%"
                    height="85%"
                >

                    <PieChart>

                        <Pie
                            data={chart.data || []}
                            dataKey={chart.valueKey}
                            nameKey={chart.nameKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={105}
                            label={({ value }) => {
                                const total = (chart.data || []).reduce(
                                    (sum, item) => sum + Number(item[chart.valueKey || ""]),
                                    0
                                );

                                const percentage =
                                    total > 0 ? ((Number(value) / total) * 100).toFixed(1) : "0";

                                return `${Number(value).toLocaleString("en-IN")} (${percentage}%)`;
                            }}
                            labelLine={true}
                        >
                            {(chart.data || []).map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </Box>
        );
    }


    return null;
}

function AILoadingMessage() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 0.6,
                    maxWidth: "80%",
                    alignItems: "flex-start",
                }}
            >
                {/* AI ICON */}

                <Box
                    sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#e0f2fe",
                        flexShrink: 0,
                    }}
                >
                    <SmartToy
                        sx={{
                            fontSize: 15,
                            color: "primary.main",
                        }}
                    />
                </Box>

                {/* LOADING BUBBLE */}

                <Paper
                    elevation={0}
                    sx={{
                        px: 1.4,
                        py: 1,
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        border: "1px solid #e4e7ec",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.6,
                    }}
                >
                    <Box
                        className="ai-loading-dot"
                    />

                    <Box
                        className="ai-loading-dot"
                        sx={{
                            animationDelay: "0.2s",
                        }}
                    />

                    <Box
                        className="ai-loading-dot"
                        sx={{
                            animationDelay: "0.4s",
                        }}
                    />

                    <Typography
                        sx={{
                            ml: 0.5,
                            fontSize: "12px",
                            color: "#667085",
                        }}
                    >
                        Connecting the ERP dots...
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default function AIReport() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const samplePrompt = location.state?.samplePrompt;

        if (
            typeof samplePrompt === "string" &&
            samplePrompt.trim()
        ) {
            setInput(samplePrompt);

            // Clear the navigation state after using it
            navigate(location.pathname, {
                replace: true,
                state: null,
            });
        }
    }, [
        location.key,
        location.pathname,
        location.state,
        navigate,
    ]);

    const VITE_API_URL = import.meta.env.VITE_API_URL

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userInput = input.trim();

        const userMessage: Message = {
            id: Date.now(),
            type: "user",
            message: userInput,
        };

        // Save current conversation BEFORE adding the new user message.
        const conversationHistory = messages.map((message) => ({
            role:
                message.type === "user"
                    ? "user"
                    : "assistant",
            content: message.message,
        }));

        // Add user message immediately.
        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(
                `${VITE_API_URL}/ai/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        prompt: userInput,
                        history: conversationHistory,
                    }),
                }
            );

            // ----------------------------------------------------
            // BACKEND ERROR
            // ----------------------------------------------------

            if (!response.ok) {

                let backendError = "";

                try {
                    backendError = await response.text();
                } catch {
                    backendError = "";
                }

                // Keep technical error only in browser console.
                console.error(
                    "AI BACKEND ERROR:",
                    {
                        status: response.status,
                        response: backendError,
                    }
                );

                throw new Error(
                    `Backend request failed with status ${response.status}`
                );
            }

            // ----------------------------------------------------
            // PARSE RESPONSE
            // ----------------------------------------------------

            const result = await response.json();

            // ----------------------------------------------------
            // VALIDATE RESPONSE
            // ----------------------------------------------------

            if (
                !result ||
                typeof result.message !== "string"
            ) {
                throw new Error(
                    "Invalid response received from AI backend."
                );
            }

            // ----------------------------------------------------
            // AI MESSAGE
            // ----------------------------------------------------

            const aiMessage: Message = {
                id: Date.now() + 1,
                type: "ai",
                message: result.message,
                chart: result.chart || null,
            };

            setMessages((prev) => [
                ...prev,
                aiMessage,
            ]);

        } catch (error) {

            // Technical error is visible only in console.
            console.error(
                "AI CHAT ERROR:",
                error
            );

            // ----------------------------------------------------
            // FRIENDLY USER MESSAGE
            // ----------------------------------------------------

            const friendlyMessage: Message = {
                id: Date.now() + 1,
                type: "ai",
                message:
                    "Sorry, I couldn't process your request right now. Please try again.",
            };

            setMessages((prev) => [
                ...prev,
                friendlyMessage,
            ]);

        } finally {

            setIsLoading(false);
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <style>
                {`
                @keyframes aiLoadingPulse {
                    0%, 80%, 100% {
                        opacity: 0.3;
                        transform: scale(0.8);
                    }

                    40% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .ai-loading-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #1976d2;
                    animation: aiLoadingPulse 1.2s infinite ease-in-out;
                }
            `}
            </style>
            <Box
                sx={{
                    height: "calc(100vh - 64px)",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f8fafc",
                }}
            >
                {/* =====================================================
                HEADER
            ====================================================== */}

                <Box
                    sx={{
                        px: 2,
                        py: 1.2,
                        borderBottom:
                            "1px solid #e5e7eb",
                        backgroundColor: "#fff",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                        }}
                    >
                        <SmartToy
                            sx={{
                                fontSize: 20,
                                color: "primary.main",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#101828",
                            }}
                        >
                            AI Report
                        </Typography>
                    </Box>
                </Box>

                {/* =====================================================
                CHAT AREA
            ====================================================== */}

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: {
                            xs: 1,
                            md: 3,
                        },
                        py: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "900px",
                            mx: "auto",
                        }}
                    >
                        {/* =================================================
                        EMPTY STATE
                    ================================================== */}

                        {messages.length === 0 && (
                            <Box
                                sx={{
                                    height: "100%",
                                    minHeight: "400px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                <Box>
                                    <SmartToy
                                        sx={{
                                            fontSize: 42,
                                            color: "primary.main",
                                            mb: 0.5,
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            color: "#101828",
                                        }}
                                    >
                                        How can I help you?
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 0.5,
                                            fontSize: "12px",
                                            color: "#667085",
                                        }}
                                    >
                                        Ask me anything about
                                        your report.
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* =================================================
                        MESSAGES
                    ================================================== */}

                        {messages.map((message) => (
                            <Box
                                key={message.id}
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        message.type === "user"
                                            ? "flex-end"
                                            : "flex-start",
                                    mb: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 0.6,
                                        maxWidth: "80%",
                                        alignItems:
                                            "flex-start",
                                    }}
                                >
                                    {/* =====================================
                                    AI ICON
                                ====================================== */}

                                    {message.type === "ai" && (
                                        <Box
                                            sx={{
                                                width: 26,
                                                height: 26,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                backgroundColor:
                                                    "#e0f2fe",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <SmartToy
                                                sx={{
                                                    fontSize: 15,
                                                    color:
                                                        "primary.main",
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* =====================================
                                    MESSAGE
                                ====================================== */}

                                    <Paper
                                        elevation={0}
                                        sx={{
                                            px: 1.2,
                                            py: 0.8,
                                            borderRadius: "10px",

                                            backgroundColor:
                                                message.type ===
                                                    "user"
                                                    ? "#1976d2"
                                                    : "#fff",

                                            color:
                                                message.type ===
                                                    "user"
                                                    ? "#fff"
                                                    : "#344054",

                                            border:
                                                message.type ===
                                                    "ai"
                                                    ? "1px solid #e4e7ec"
                                                    : "none",

                                            /*
                                             * Main text
                                             */
                                            fontSize: "13px",
                                            lineHeight: 1.45,

                                            /*
                                             * Paragraph
                                             */
                                            "& p": {
                                                margin:
                                                    "3px 0",
                                                fontSize:
                                                    "13px",
                                                lineHeight:
                                                    1.45,
                                            },

                                            /*
                                             * H2
                                             */
                                            "& h2": {
                                                fontSize:
                                                    "16px",
                                                margin:
                                                    "5px 0 7px",
                                                fontWeight: 700,
                                                lineHeight:
                                                    1.3,
                                            },

                                            /*
                                             * H3
                                             */
                                            "& h3": {
                                                fontSize:
                                                    "14px",
                                                margin:
                                                    "7px 0 4px",
                                                fontWeight: 600,
                                                lineHeight:
                                                    1.3,
                                            },

                                            /*
                                             * H4
                                             */
                                            "& h4": {
                                                fontSize:
                                                    "13px",
                                                margin:
                                                    "6px 0 3px",
                                                fontWeight: 600,
                                            },

                                            /*
                                             * Lists
                                             */
                                            "& ul": {
                                                margin:
                                                    "3px 0",
                                                paddingLeft:
                                                    "18px",
                                            },

                                            "& ol": {
                                                margin:
                                                    "3px 0",
                                                paddingLeft:
                                                    "18px",
                                            },

                                            "& li": {
                                                marginBottom:
                                                    "2px",
                                                fontSize:
                                                    "13px",
                                                lineHeight:
                                                    1.4,
                                            },

                                            /*
                                             * Bold text
                                             */
                                            "& strong": {
                                                fontWeight: 600,
                                            },

                                            /*
                                             * Links
                                             */
                                            "& a": {
                                                color:
                                                    "primary.main",
                                                textDecoration:
                                                    "none",
                                            },

                                            /*
                                             * Horizontal line
                                             */
                                            "& hr": {
                                                border: 0,
                                                borderTop:
                                                    "1px solid #e4e7ec",
                                                margin:
                                                    "6px 0",
                                            },

                                            /*
                                             * Code
                                             */
                                            "& code": {
                                                fontSize:
                                                    "12px",
                                                backgroundColor:
                                                    "#f2f4f7",
                                                padding:
                                                    "1px 4px",
                                                borderRadius:
                                                    "4px",
                                            },

                                            /*
                                             * Table
                                             */
                                            "& table": {
                                                width: "100%",
                                                borderCollapse:
                                                    "collapse",
                                                margin:
                                                    "6px 0",
                                                fontSize:
                                                    "12px",
                                            },

                                            /*
                                             * Table Header
                                             */
                                            "& th": {
                                                border:
                                                    "1px solid #d0d5dd",
                                                padding:
                                                    "4px 7px",
                                                backgroundColor:
                                                    "#f5f7fa",
                                                textAlign:
                                                    "left",
                                                fontWeight: 600,
                                                fontSize:
                                                    "12px",
                                                lineHeight:
                                                    1.3,
                                            },

                                            /*
                                             * Table Body
                                             */
                                            "& td": {
                                                border:
                                                    "1px solid #d0d5dd",
                                                padding:
                                                    "4px 7px",
                                                fontSize:
                                                    "12px",
                                                lineHeight:
                                                    1.3,
                                            },
                                        }}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[
                                                remarkGfm,
                                            ]}
                                        >
                                            {message.message}
                                        </ReactMarkdown>
                                        {message.type === "ai" &&
                                            message.chart && (
                                                <ERPChart
                                                    chart={message.chart}
                                                />
                                            )}
                                    </Paper>

                                    {/* =====================================
                                    USER ICON
                                ====================================== */}

                                    {message.type === "user" && (
                                        <Box
                                            sx={{
                                                width: 26,
                                                height: 26,
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                backgroundColor:
                                                    "#dbeafe",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Person
                                                sx={{
                                                    fontSize: 15,
                                                    color:
                                                        "#2563eb",
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ))}

                        {isLoading && (
                            <AILoadingMessage />
                        )}
                    </Box>
                </Box>

                {/* =====================================================
                INPUT AREA
            ====================================================== */}

                <Box
                    sx={{
                        px: {
                            xs: 1,
                            md: 3,
                        },
                        pb: 1,
                        pt: 0.5,
                        backgroundColor: "#f8fafc",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "900px",
                            mx: "auto",
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                display: "flex",
                                alignItems:
                                    "flex-end",
                                gap: 0.5,
                                p: 0.6,
                                borderRadius: "12px",
                                border:
                                    "1px solid #d0d5dd",
                                backgroundColor:
                                    "#fff",

                                "&:focus-within": {
                                    borderColor:
                                        "#1976d2",

                                    boxShadow:
                                        "0 0 0 2px rgba(25,118,210,0.08)",
                                },
                            }}
                        >

                            {/* =========================================
                            INPUT
                        ========================================== */}

                            <TextField
                                fullWidth
                                multiline
                                maxRows={5}
                                placeholder={
                                    isLoading
                                        ? "Waiting for response..."
                                        : "Ask anything about your report..."
                                }
                                value={input}
                                onChange={(e) =>
                                    setInput(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                                variant="standard"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                    },
                                }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        fontSize: "13px",
                                        py: 0.5,
                                    },
                                }}
                            />

                            {/* =========================================
                            SEND
                        ========================================== */}

                            <IconButton
                                color="primary"
                                onClick={handleSend}
                                disabled={
                                    !input.trim() ||
                                    isLoading
                                }
                                size="small"
                                sx={{
                                    mb: 0.2,
                                    width: 30,
                                    height: 30,

                                    backgroundColor:
                                        input.trim() && !isLoading
                                            ? "primary.main"
                                            : "#e4e7ec",

                                    color: "#fff",

                                    "&:hover": {
                                        backgroundColor:
                                            "primary.dark",
                                    },

                                    "&.Mui-disabled": {
                                        backgroundColor:
                                            "#e4e7ec",
                                    },
                                }}
                            >
                                <Send
                                    sx={{
                                        fontSize: 16,
                                    }}
                                />
                            </IconButton>
                        </Paper>

                        {/* =============================================
                        FOOTER NOTE
                    ============================================== */}

                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "10px",
                                color: "#98a2b3",
                                mt: 0.5,
                            }}
                        >
                            AI-generated responses may
                            contain errors. Please verify
                            important information.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}