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

import dayjs, { Dayjs } from "dayjs";

import {
    LocalizationProvider,
} from "@mui/x-date-pickers/LocalizationProvider";

import {
    AdapterDayjs,
} from "@mui/x-date-pickers/AdapterDayjs";

import {
    DatePicker,
} from "@mui/x-date-pickers/DatePicker";

import { Edit } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";


// ============================================================
// TYPE
// ============================================================

interface SalesInvoice {
    id: number;
    salesInvoiceNumber: string;
    salesInvoiceDate: string;
    customerId: number;
    customerName: string;
    totalAmount: number;
}


// ============================================================
// COMPONENT
// ============================================================

export default function SalesOrder() {

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();


    // ========================================================
    // STATES
    // ========================================================

    const [salesInvoiceNumber, setSalesInvoiceNumber] =
        useState("");

    const [fromDate, setFromDate] =
        useState<Dayjs | null>(null);

    const [toDate, setToDate] =
        useState<Dayjs | null>(null);

    const [salesInvoices, setSalesInvoices] =
        useState<SalesInvoice[]>([]);

    const [loading, setLoading] =
        useState(false);

const VITE_API_URL = import.meta.env.VITE_API_URL
    // ============================================================
    // GET / SEARCH SALES ORDERS
    // ============================================================

    const getSalesOrders = async (
        showMessage = false,
        searchSalesInvoiceNumber = salesInvoiceNumber,
        searchFromDate = fromDate,
        searchToDate = toDate
    ) => {

        try {

            setLoading(true);

            const params = new URLSearchParams();

            // ----------------------------------------------------
            // SALES ORDER NUMBER
            // ----------------------------------------------------

            if (searchSalesInvoiceNumber.trim()) {

                params.append(
                    "salesInvoiceNumber",
                    searchSalesInvoiceNumber.trim()
                );
            }

            // ----------------------------------------------------
            // FROM DATE
            // ----------------------------------------------------

            if (searchFromDate) {

                params.append(
                    "fromDate",
                    searchFromDate.format("YYYY-MM-DD")
                );
            }

            // ----------------------------------------------------
            // TO DATE
            // ----------------------------------------------------

            if (searchToDate) {

                params.append(
                    "toDate",
                    searchToDate.format("YYYY-MM-DD")
                );
            }

            // ----------------------------------------------------
            // API
            // ----------------------------------------------------

            const queryString = params.toString();

            const response = await fetch(
                `${VITE_API_URL}/sales-invoices${queryString
                    ? `?${queryString}`
                    : ""
                }`
            );

            const result = await response.json();

            if (!response.ok) {

                throw new Error(
                    result.detail ||
                    result.message ||
                    "Failed to fetch sales orders"
                );
            }

            const data: SalesInvoice[] =
                result.data || [];

            setSalesInvoices(data);

            // ----------------------------------------------------
            // SEARCH MESSAGE
            // ----------------------------------------------------

            if (showMessage) {

                if (data.length > 0) {

                    enqueueSnackbar(
                        `${data.length} sales order(s) found`,
                        {
                            variant: "success"
                        }
                    );

                } else {

                    enqueueSnackbar(
                        "No sales orders found",
                        {
                            variant: "info"
                        }
                    );
                }
            }

        } catch (error: any) {

            console.error(
                "Sales order fetch error:",
                error
            );

            enqueueSnackbar(
                error.message ||
                "Failed to load sales orders",
                {
                    variant: "error"
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

        getSalesOrders();

    }, []);


    // ============================================================
    // SEARCH
    // ============================================================

    const handleSearch = () => {

        getSalesOrders(true);

    };


    // ============================================================
    // CLEAR
    // ============================================================

    const handleClear = () => {

        // Clear UI
        setSalesInvoiceNumber("");
        setFromDate(null);
        setToDate(null);

        // IMPORTANT:
        // Explicitly send empty search values.
        // Do not let getSalesOrders() read old React state.
        getSalesOrders(
            false,
            "",
            null,
            null
        );

        enqueueSnackbar(
            "Search cleared",
            {
                variant: "info"
            }
        );
    };


    // ============================================================
    // ADD SALES ORDER
    // ============================================================

    const handleAddSalesOrder = () => {

        navigate(
            "/erp/salesOrderAction"
        );

    };


    // ============================================================
    // EDIT SALES ORDER
    // ============================================================

    const handleEditSalesOrder = (
        salesInvoiceId: number
    ) => {

        navigate(
            "/erp/salesOrderAction",
            {
                state: {
                    salesInvoiceId:
                        salesInvoiceId,
                },
            }
        );

    };


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (
        date: string
    ) => {

        if (!date) {
            return "";
        }

        return dayjs(date).format(
            "DD-MMM-YYYY"
        );

    };


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <Box sx={{ p: 3 }}>

            {/* =================================================
                PAGE TITLE
            ================================================== */}

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Search Sales Invoice
            </Typography>


            {/* =================================================
                SEARCH SECTION
            ================================================== */}

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
                        justifyContent:
                            "space-between",
                        gap: 2,
                    }}
                >

                    {/* =========================================
                        LEFT SEARCH
                    ========================================== */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                        }}
                    >

                        {/* Sales Order Number */}

                        <TextField
                            label="Sales Invoice Number"
                            placeholder="SO001"
                            value={
                                salesInvoiceNumber
                            }
                            onChange={(e) =>
                                setSalesInvoiceNumber(
                                    e.target.value
                                )
                            }
                            size="small"
                        />


                        {/* Date */}

                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >

                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                onChange={(newValue) => setFromDate(newValue)}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        size: "small",
                                    },
                                }}
                            />

                            <DatePicker
                                label="To Date"
                                value={toDate}
                                onChange={(newValue) => setToDate(newValue)}
                                minDate={fromDate || undefined}
                                format="DD/MM/YYYY"
                                slotProps={{
                                    textField: {
                                        size: "small",
                                    },
                                }}
                            />

                        </LocalizationProvider>


                        {/* Search */}

                        <Button
                            variant="contained"
                            onClick={
                                handleSearch
                            }
                            disabled={
                                loading
                            }
                            sx={{
                                textTransform:
                                    "none",
                                fontWeight: 600,
                            }}
                        >
                            Search
                        </Button>


                        {/* Clear */}

                        <Button
                            variant="outlined"
                            onClick={
                                handleClear
                            }
                            disabled={
                                loading
                            }
                            sx={{
                                textTransform:
                                    "none",
                                fontWeight: 600,
                            }}
                        >
                            Clear
                        </Button>

                    </Box>


                    {/* =========================================
                        ADD
                    ========================================== */}

                    <Button
                        variant="contained"
                        onClick={
                            handleAddSalesOrder
                        }
                        sx={{
                            whiteSpace:
                                "nowrap",
                            textTransform:
                                "none",
                            fontWeight: 600,
                        }}
                    >
                        Add Sales Invoice
                    </Button>

                </Box>

            </Paper>


            {/* =================================================
                SALES ORDER TABLE
            ================================================== */}

            <TableContainer
                component={Paper}
            >

                <Table>

                    <TableHead>

                        <TableRow>


                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Sales Invoice Number
                            </TableCell>


                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Customer
                            </TableCell>


                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Sales Invoice Date
                            </TableCell>


                            <TableCell
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Total Amount
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

                        {/* =====================================
                            LOADING
                        ====================================== */}

                        {loading ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >
                                    Loading...
                                </TableCell>

                            </TableRow>

                        ) : salesInvoices.length ===
                            0 ? (

                            /* =================================
                                NO DATA
                            ================================== */

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >
                                    No sales Invoices found
                                </TableCell>

                            </TableRow>

                        ) : (

                            /* =================================
                                DATA
                            ================================== */

                            salesInvoices.map(
                                (order) => (

                                    <TableRow
                                        key={
                                            order.id
                                        }
                                    >


                                        <TableCell>
                                            {
                                                order.salesInvoiceNumber
                                            }
                                        </TableCell>


                                        <TableCell>
                                            {
                                                order.customerName
                                            }
                                        </TableCell>


                                        <TableCell>
                                            {
                                                formatDate(
                                                    order.salesInvoiceDate
                                                )
                                            }
                                        </TableCell>


                                        <TableCell>
                                            ₹{" "}
                                            {Number(
                                                order.totalAmount
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits:
                                                        2,
                                                    maximumFractionDigits:
                                                        2,
                                                }
                                            )}
                                        </TableCell>


                                        <TableCell>

                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditSalesOrder(
                                                        order.id
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