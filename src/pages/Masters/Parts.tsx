import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";

import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

interface Part {
    id: number;
    partNumber: string;
    partName: string;
    partPrice: number;
}

export default function Parts() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const VITE_API_URL = import.meta.env.VITE_API_URL

    const [partNumber, setPartNumber] = useState("");
    const [partName, setPartName] = useState("");
    const [filteredParts, setFilteredParts] = useState<Part[]>([]);

    const [loading, setLoading] = useState(false);

    // ============================================================
    // GET / SEARCH PARTS
    // ============================================================

    const getParts = async (
        searchPartNumber = "",
        searchPartName = "",
        showMessage = false
    ) => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (searchPartNumber.trim()) {
                params.append(
                    "partNumber",
                    searchPartNumber.trim()
                );
            }

            if (searchPartName.trim()) {
                params.append(
                    "partName",
                    searchPartName.trim()
                );
            }

            const response = await fetch(
                `${VITE_API_URL}/parts?${params.toString()}`
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch parts"
                );
            }

            const data = result.data || [];
            setFilteredParts(data);

            // Show message only when user clicks Search
            if (showMessage) {
                if (data.length > 0) {
                    enqueueSnackbar(
                        `${data.length} part(s) found`,
                        {
                            variant: "success",
                        }
                    );
                } else {
                    enqueueSnackbar(
                        "No parts found",
                        {
                            variant: "info",
                        }
                    );
                }
            }

        } catch (error: any) {
            console.error(
                "Part fetch error:",
                error
            );

            enqueueSnackbar(
                error.message || "Failed to load parts",
                {
                    variant: "error",
                }
            );

        } finally {
            setLoading(false);
        }
    };

    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {
        getParts();
    }, []);

    // ============================================================
    // SEARCH
    // ============================================================

    const handleSearch = () => {
        getParts(
            partNumber,
            partName,
            true
        );
    };

    // ============================================================
    // CLEAR SEARCH
    // ============================================================

    const handleClear = () => {
        setPartNumber("");
        setPartName("");

        getParts();

        enqueueSnackbar(
            "Search cleared",
            {
                variant: "info",
            }
        );
    };

    // ============================================================
    // ADD PART
    // ============================================================

    const handleAddPart = () => {
        navigate("/erp/partsAction");
    };

    // ============================================================
    // EDIT PART
    // ============================================================

    const handleEditPart = (partId: number) => {
        navigate("/erp/partsAction", {
            state: {
                partId: partId,
            },
        });
    };

    return (
        <Box sx={{ p: 3 }}>

            {/* =====================================================
                PAGE TITLE
            ====================================================== */}

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Part
            </Typography>


            {/* =====================================================
                SEARCH SECTION
            ====================================================== */}

            <Paper
                elevation={1}
                sx={{
                    p: 2,
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >

                    {/* Search */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >

                        <TextField
                            label="Part Number"
                            value={partNumber}
                            onChange={(e) =>
                                setPartNumber(e.target.value)
                            }
                            size="small"
                        />

                        <TextField
                            label="Part Name"
                            value={partName}
                            onChange={(e) =>
                                setPartName(e.target.value)
                            }
                            size="small"
                        />

                        <Button
                            variant="contained"
                            onClick={handleSearch}
                            disabled={loading}
                        >
                            Search
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleClear}
                            disabled={loading}
                        >
                            Clear
                        </Button>

                    </Box>


                    {/* Add Part */}

                    <Button
                        variant="contained"
                        onClick={handleAddPart}
                    >
                        Add Part
                    </Button>

                </Box>
            </Paper>


            {/* =====================================================
                PART TABLE
            ====================================================== */}

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Part Number
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Part Name
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Part Price
                            </TableCell>

                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Action
                            </TableCell>

                        </TableRow>

                    </TableHead>


                    <TableBody>

                        {/* Loading */}

                        {loading ? (

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    align="center"
                                >
                                    Loading...
                                </TableCell>

                            </TableRow>

                        ) : filteredParts.length === 0 ? (

                            /* No Data */

                            <TableRow>

                                <TableCell
                                    colSpan={5}
                                    align="center"
                                >
                                    No parts found
                                </TableCell>

                            </TableRow>

                        ) : (

                            /* Data */

                            filteredParts.map(
                                (part) => (

                                    <TableRow
                                        key={part.id}
                                    >

                                        <TableCell>
                                            {part.partNumber}
                                        </TableCell>

                                        <TableCell>
                                            {part.partName}
                                        </TableCell>

                                        <TableCell>
                                            ₹{" "}
                                            {Number(
                                                part.partPrice
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </TableCell>

                                        <TableCell>

                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditPart(
                                                        part.id
                                                    )
                                                }
                                            >
                                                <Edit />
                                            </IconButton>

                                        </TableCell>

                                    </TableRow>

                                )
                            )

                        )}

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>
    );
}