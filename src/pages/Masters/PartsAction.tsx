import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useSnackbar } from "notistack";

export default function PartsAction() {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const VITE_API_URL = import.meta.env.VITE_API_URL

    // ============================================================
    // GET PART ID FROM ROUTER STATE
    // ============================================================

    const partId = location.state?.partId;

    // ============================================================
    // STATES
    // ============================================================

    const [partNumber, setPartNumber] = useState("");
    const [partName, setPartName] = useState("");
    const [price, setPrice] = useState("");

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // ============================================================
    // GET PART BY ID
    // ============================================================

    const getPartById = async (id: number) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${VITE_API_URL}/parts/${id}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch part"
                );
            }

            setPartNumber(
                result.data.PartNumber ||
                result.data.partNumber ||
                ""
            );

            setPartName(
                result.data.PartName ||
                result.data.partName ||
                ""
            );

            setPrice(
                result.data.partPrice?.toString() || ""
            );

        } catch (error: any) {
            console.error(
                "Get part error:",
                error
            );

            enqueueSnackbar(
                error.message || "Failed to load part",
                {
                    variant: "error",
                }
            );

        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // LOAD PART FOR EDIT
    // ============================================================

    useEffect(() => {
        if (partId) {
            getPartById(partId);
        }
    }, [partId]);

    // ============================================================
    // SUBMIT
    // ============================================================

    const handleSubmit = async () => {

        // --------------------------------------------------------
        // VALIDATION
        // --------------------------------------------------------

        if (!partName.trim()) {
            enqueueSnackbar(
                "Part name is required",
                {
                    variant: "error",
                }
            );

            return;
        }

        if (!price.trim()) {
            enqueueSnackbar(
                "Part price is required",
                {
                    variant: "error",
                }
            );

            return;
        }

        const numericPrice = Number(price);

        if (isNaN(numericPrice)) {
            enqueueSnackbar(
                "Please enter a valid price",
                {
                    variant: "error",
                }
            );

            return;
        }

        if (numericPrice < 0) {
            enqueueSnackbar(
                "Part price cannot be negative",
                {
                    variant: "error",
                }
            );

            return;
        }

        try {
            setSaving(true);

            let response;

            // ====================================================
            // UPDATE
            // ====================================================

            if (partId) {

                response = await fetch(
                    `${VITE_API_URL}/parts/${partId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            partName: partName.trim(),
                            partPrice: numericPrice,
                        }),
                    }
                );

            }

            // ====================================================
            // CREATE
            // ====================================================

            else {

                response = await fetch(
                    `${VITE_API_URL}/parts`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            partName: partName.trim(),
                            partPrice: numericPrice,
                        }),
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
                    "Failed to save part"
                );

                (error as any).status = response.status;

                throw error;
            }

            // ====================================================
            // SUCCESS
            // ====================================================

            if (partId) {
                enqueueSnackbar(
                    "Part updated successfully",
                    {
                        variant: "success",
                    }
                );
            } else {
                enqueueSnackbar(
                    "Part created successfully",
                    {
                        variant: "success",
                    }
                );
            }

            // Navigate after showing snackbar
            setTimeout(() => {
                navigate("/erp/parts");
            }, 500);

        } catch (error: any) {

            console.error(
                "Save part error:",
                error
            );

            if (error.status === 409) {
                enqueueSnackbar(
                    error.message || "Part already exists",
                    {
                        variant: "error",
                    }
                );

                return;
            }

            enqueueSnackbar(
                error.message || "Failed to save part",
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
        navigate("/erp/parts");
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
                    {partId
                        ? "Edit Part"
                        : "Add Part"}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "13px",
                        color: "#667085",
                        mt: 0.5,
                    }}
                >
                    Enter part details.
                </Typography>

            </Box>


            {/* =====================================================
                PART DETAILS
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
                    Part Details
                </Typography>


                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                        },
                        gap: 2,
                    }}
                >

                    {/* =================================================
                        PART NUMBER
                        Only shown during EDIT
                    ================================================== */}

                    {partId && (
                        <TextField
                            label="Part Number"
                            value={partNumber}
                            size="small"
                            fullWidth
                            disabled
                        />
                    )}


                    {/* =================================================
                        PART NAME
                    ================================================== */}

                    <TextField
                        label="Part Name"
                        placeholder="Enter part name"
                        value={partName}
                        onChange={(e) =>
                            setPartName(e.target.value)
                        }
                        size="small"
                        fullWidth
                        disabled={loading || saving}
                    />


                    {/* =================================================
                        PRICE
                    ================================================== */}

                    <TextField
                        label="Price"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        size="small"
                        fullWidth
                        type="number"
                        disabled={loading || saving}
                        slotProps={{
                            htmlInput: {
                                min: 0,
                                step: "0.01",
                            },
                        }}
                    />

                </Box>

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
                        : partId
                            ? "Update"
                            : "Submit"}
                </Button>

            </Box>

        </Box>
    );
}