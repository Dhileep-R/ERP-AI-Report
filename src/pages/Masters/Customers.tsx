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

interface Customer {
    id: number;
    name: string;
}

export default function Customers() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const VITE_API_URL = import.meta.env.VITE_API_URL

    const [customerName, setCustomerName] = useState("");
    const [filteredCustomers, setFilteredCustomers] =
        useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);

    // ============================================================
    // GET CUSTOMERS
    // ============================================================

    const getCustomers = async (
        name = "",
        showSuccessMessage = false
    ) => {
        try {
            setLoading(true);

            const response = await fetch(
                `${VITE_API_URL}/customers?name=${encodeURIComponent(
                    name
                )}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch customers");
            }

            const result = await response.json();

            setFilteredCustomers(result.data || []);

            // Show success only when requested
            if (showSuccessMessage) {
                if (result.data?.length > 0) {
                    enqueueSnackbar(
                        `${result.data.length} customer(s) found`,
                        {
                            variant: "success",
                        }
                    );
                } else {
                    enqueueSnackbar(
                        "No customers found",
                        {
                            variant: "info",
                        }
                    );
                }
            }

        } catch (error) {
            console.error(
                "Customer fetch error:",
                error
            );

            enqueueSnackbar(
                "Failed to load customers",
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
        getCustomers();
    }, []);

    // ============================================================
    // SEARCH
    // ============================================================

    const handleSearch = () => {
        getCustomers(
            customerName.trim(),
            true
        );
    };

    // ============================================================
    // CLEAR SEARCH
    // ============================================================

    const handleClear = () => {
        setCustomerName("");

        getCustomers();

        enqueueSnackbar(
            "Search cleared",
            {
                variant: "info",
            }
        );
    };

    // ============================================================
    // ADD CUSTOMER
    // ============================================================

    const handleAddCustomer = () => {
        navigate("/erp/customersAction");
    };

    // ============================================================
    // EDIT CUSTOMER
    // ============================================================

    const handleEditCustomer = (customerId: number) => {
        navigate("/erp/customersAction", {
            state: {
                customerId: customerId,
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
                Customer
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
                            label="Customer Name"
                            value={customerName}
                            onChange={(e) =>
                                setCustomerName(
                                    e.target.value
                                )
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


                    {/* Add Customer */}

                    <Button
                        variant="contained"
                        onClick={handleAddCustomer}
                    >
                        Add Customer
                    </Button>

                </Box>
            </Paper>


            {/* =====================================================
                CUSTOMER TABLE
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
                                Customer Name
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

                        {loading ? (

                            <TableRow>

                                <TableCell
                                    colSpan={3}
                                    align="center"
                                >
                                    Loading...
                                </TableCell>

                            </TableRow>

                        ) : filteredCustomers.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={3}
                                    align="center"
                                >
                                    No customers found
                                </TableCell>

                            </TableRow>

                        ) : (

                            filteredCustomers.map(
                                (customer) => (

                                    <TableRow
                                        key={customer.id}
                                    >

                                        <TableCell>
                                            {customer.name}
                                        </TableCell>

                                        <TableCell>

                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditCustomer(
                                                        customer.id
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