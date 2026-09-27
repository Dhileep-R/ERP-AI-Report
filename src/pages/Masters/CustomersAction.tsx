import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function CustomersAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const VITE_API_URL = import.meta.env.VITE_API_URL

    // ============================================================
    // CUSTOMER ID
    // ============================================================

    const customerId = location.state?.customerId;

    const [customerName, setCustomerName] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // ============================================================
    // GET CUSTOMER BY ID
    // ============================================================

    const getCustomerById = async (id: number) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${VITE_API_URL}/customers/${id}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch customer"
                );
            }

            setCustomerName(result.data.name);

        } catch (error: any) {
            console.error(
                "Error fetching customer:",
                error
            );

            enqueueSnackbar(
                error.message || "Failed to load customer",
                {
                    variant: "error",
                }
            );

        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // LOAD CUSTOMER FOR EDIT
    // ============================================================

    useEffect(() => {
        if (customerId) {
            getCustomerById(customerId);
        }
    }, [customerId]);

    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async () => {

        // Validate customer name
        if (!customerName.trim()) {
            enqueueSnackbar(
                "Customer name is required",
                {
                    variant: "error",
                }
            );

            return;
        }

        const customer = {
            name: customerName.trim(),
        };

        try {
            setSaving(true);

            let response;

            // ====================================================
            // UPDATE CUSTOMER
            // ====================================================

            if (customerId) {

                response = await fetch(
                    `${VITE_API_URL}/customers/${customerId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(customer),
                    }
                );

            }

            // ====================================================
            // CREATE CUSTOMER
            // ====================================================

            else {

                response = await fetch(
                    `${VITE_API_URL}/customers`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(customer),
                    }
                );

            }

            const result = await response.json();

            // ====================================================
            // API ERROR
            // ====================================================

            if (!response.ok) {
                const error = new Error(
                    result.detail ||
                    result.message ||
                    "Failed to save customer"
                );

                (error as any).status = response.status;

                throw error;
            }

            // ====================================================
            // SUCCESS
            // ====================================================

            if (customerId) {

                enqueueSnackbar(
                    "Customer updated successfully",
                    {
                        variant: "success",
                    }
                );

            } else {

                enqueueSnackbar(
                    "Customer created successfully",
                    {
                        variant: "success",
                    }
                );

            }

            // Give snackbar time to display before navigation
            setTimeout(() => {
                navigate("/erp/customers");
            }, 500);

        } catch (error: any) {

            console.log("Error saving customer:", error);

            if (error.status === 409) {
                enqueueSnackbar("Customer already exists", {
                    variant: "error",
                });

                return;
            }

            enqueueSnackbar(
                error.message || "Failed to save customer",
                {
                    variant: "error",
                }
            );

        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // BACK
    // ============================================================

    const handleBack = () => {
        navigate("/erp/customers");
    };

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 1000,
                mx: "auto",
            }}
        >

            {/* =====================================================
                PAGE TITLE
            ====================================================== */}

            <Box sx={{ mb: 3 }}>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#1d2939",
                    }}
                >
                    {customerId
                        ? "Edit Customer"
                        : "Add Customer"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#667085",
                        mt: 0.5,
                    }}
                >
                    Enter customer details.
                </Typography>

            </Box>


            {/* =====================================================
                CUSTOMER DETAILS
            ====================================================== */}

            <Paper
                elevation={0}
                sx={{
                    border: "1px solid #e4e7ec",
                    borderRadius: "12px",
                    p: 2,
                }}
            >

                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#344054",
                        mb: 2,
                    }}
                >
                    Customer Details
                </Typography>

                <TextField
                    label="Customer Name"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(e.target.value)
                    }
                    size="small"
                    fullWidth
                    disabled={loading || saving}
                />

            </Paper>


            {/* =====================================================
                BOTTOM ACTIONS
            ====================================================== */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1.5,
                    mt: 3,
                }}
            >

                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    disabled={saving}
                    sx={{
                        minWidth: "100px",
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading || saving}
                    sx={{
                        minWidth: "110px",
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    {saving
                        ? "Saving..."
                        : customerId
                            ? "Update"
                            : "Submit"}
                </Button>

            </Box>

        </Box>
    );
}