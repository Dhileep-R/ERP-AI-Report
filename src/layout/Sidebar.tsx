import { useState } from "react";
import {
    Box,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import {
    ExpandLess,
    ExpandMore,
    ShoppingCart,
    Description,
    AutoAwesome,
    People,
    Inventory2,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [masterOpen, setMasterOpen] = useState(true);
    const [salesOpen, setSalesOpen] = useState(true);

    const isActive = (path: string) =>
        location.pathname === path;

    return (
        <Box
            sx={{
                flexShrink: 0,
                height: "100vh",
                bgcolor: "#fff",
                borderRight: "1px solid #E5E7EB",
                width: "fit-content",
                minWidth: "max-content",
            }}
        >
            <Toolbar />

            <List>

                {/* =====================================================
                    MASTER
                ====================================================== */}

                <ListItemButton
                    onClick={() => setMasterOpen(!masterOpen)}
                >
                    <ListItemIcon>
                        <Inventory2 color="primary" />
                    </ListItemIcon>

                    <ListItemText primary="Masters" />

                    {masterOpen ? (
                        <ExpandLess />
                    ) : (
                        <ExpandMore />
                    )}
                </ListItemButton>

                <Collapse
                    in={masterOpen}
                    timeout="auto"
                    unmountOnExit
                >
                    <List
                        component="div"
                        disablePadding
                    >

                        {/* Customer */}

                        <ListItemButton
                            sx={{
                                pl: 4,

                                bgcolor: isActive(
                                    "/erp/customers"
                                )
                                    ? "#DBEAFE"
                                    : "transparent",

                                "&:hover": {
                                    bgcolor: "#EFF6FF",
                                },
                            }}
                            onClick={() =>
                                navigate("/erp/customers")
                            }
                        >
                            <ListItemIcon>
                                <People
                                    color={
                                        isActive(
                                            "/erp/customers"
                                        )
                                            ? "primary"
                                            : "inherit"
                                    }
                                />
                            </ListItemIcon>

                            <ListItemText
                                primary="Customers"
                            />
                        </ListItemButton>


                        {/* Part */}

                        <ListItemButton
                            sx={{
                                pl: 4,

                                bgcolor: isActive(
                                    "/erp/parts"
                                )
                                    ? "#DBEAFE"
                                    : "transparent",

                                "&:hover": {
                                    bgcolor: "#EFF6FF",
                                },
                            }}
                            onClick={() =>
                                navigate("/erp/parts")
                            }
                        >
                            <ListItemIcon>
                                <Inventory2
                                    color={
                                        isActive(
                                            "/erp/parts"
                                        )
                                            ? "primary"
                                            : "inherit"
                                    }
                                />
                            </ListItemIcon>

                            <ListItemText
                                primary="Parts"
                            />
                        </ListItemButton>

                    </List>
                </Collapse>


                {/* =====================================================
                    SALES
                ====================================================== */}

                <ListItemButton
                    onClick={() => setSalesOpen(!salesOpen)}
                >
                    <ListItemIcon>
                        <ShoppingCart color="primary" />
                    </ListItemIcon>

                    <ListItemText primary="Sales" />

                    {salesOpen ? (
                        <ExpandLess />
                    ) : (
                        <ExpandMore />
                    )}
                </ListItemButton>

                <Collapse
                    in={salesOpen}
                    timeout="auto"
                    unmountOnExit
                >
                    <List
                        component="div"
                        disablePadding
                    >

                        {/* Sales Order */}

                        <ListItemButton
                            sx={{
                                pl: 4,

                                bgcolor: isActive(
                                    "/erp/sales-order"
                                )
                                    ? "#DBEAFE"
                                    : "transparent",

                                "&:hover": {
                                    bgcolor: "#EFF6FF",
                                },
                            }}
                            onClick={() =>
                                navigate("/erp/sales-order")
                            }
                        >
                            <ListItemIcon>
                                <Description
                                    color={
                                        isActive(
                                            "/erp/sales-order"
                                        )
                                            ? "primary"
                                            : "inherit"
                                    }
                                />
                            </ListItemIcon>

                            <ListItemText
                                primary="Sales Invoice"
                            />
                        </ListItemButton>

                    </List>
                </Collapse>


                {/* =====================================================
                    AI REPORT
                ====================================================== */}

                <ListItemButton
                    sx={{
                        bgcolor: isActive(
                            "/erp/ai-report"
                        )
                            ? "#DBEAFE"
                            : "transparent",

                        "&:hover": {
                            bgcolor: "#EFF6FF",
                        },
                    }}
                    onClick={() =>
                        navigate("/erp/ai-report")
                    }
                >
                    <ListItemIcon>
                        <AutoAwesome
                            color={
                                isActive(
                                    "/erp/ai-report"
                                )
                                    ? "primary"
                                    : "inherit"
                            }
                        />
                    </ListItemIcon>

                    <ListItemText primary="AI Report" />
                </ListItemButton>

            </List>
        </Box>
    );
}