import { useEffect, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";

import {
    Add,
    ArrowBack,
    Delete,
    Edit,
    Save,
    Close,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// ============================================================
// TYPES
// ============================================================

interface Customer {
    id: number;
    name: string;
}

interface Part {
    id: number;
    partNumber: string;
    partName: string;
    partPrice: number;
}

interface LineItem {
    id: number;
    partId: number;
    partName: string;
    partNumber: string;
    price: number;
    quantity: number;
}

interface SalesInvoiceResponse {
    id: number;
    salesInvoiceNumber: string;
    salesInvoiceDate: string;
    customerId: number;
    customerName: string;

    lineItems: {
        id: number;
        salesInvoiceId: number;
        partId: number;
        partNumber: string;
        partName: string;
        price: number | string;
        quantity: number | string;
    }[];
}

// ============================================================
// COMPONENT
// ============================================================

export default function SalesOrderAction() {
    const navigate = useNavigate();
    const location = useLocation();

    const { enqueueSnackbar } = useSnackbar();
    const VITE_API_URL = import.meta.env.VITE_API_URL

    // ============================================================
    // EDIT MODE
    // ============================================================

    const salesInvoiceId = location.state?.salesInvoiceId;

    const isEditMode = Boolean(salesInvoiceId);

    // ============================================================
    // SALES ORDER
    // ============================================================

    const [salesInvoiceNumber, setSalesInvoiceNumber] = useState("");

    const [salesInvoiceDate, setSalesInvoiceDate] =
        useState<Dayjs | null>(null);

    // ============================================================
    // CUSTOMER
    // ============================================================

    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    const [customerOptions, setCustomerOptions] =
        useState<Customer[]>([]);

    const [customerSearch, setCustomerSearch] =
        useState("");

    const [customerLoading, setCustomerLoading] =
        useState(false);

    // ============================================================
    // PART
    // ============================================================

    const [selectedPart, setSelectedPart] =
        useState<Part | null>(null);

    const [partOptions, setPartOptions] =
        useState<Part[]>([]);

    const [partSearch, setPartSearch] =
        useState("");

    const [partLoading, setPartLoading] =
        useState(false);

    // ============================================================
    // LINE ITEM INPUT
    // ============================================================

    const [quantity, setQuantity] =
        useState("1");

    const [price, setPrice] =
        useState("");

    const [editingItemId, setEditingItemId] =
        useState<number | null>(null);

    // ============================================================
    // LINE ITEMS
    // ============================================================

    const [lineItems, setLineItems] =
        useState<LineItem[]>([]);

    // ============================================================
    // LOADING
    // ============================================================

    const [pageLoading, setPageLoading] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    // ============================================================
    // CUSTOMER SEARCH
    // ============================================================

    useEffect(() => {
        const searchCustomers = async () => {
            try {
                setCustomerLoading(true);

                const params =
                    new URLSearchParams();

                if (customerSearch.trim()) {
                    params.append(
                        "name",
                        customerSearch.trim()
                    );
                }

                const response = await fetch(
                    `${VITE_API_URL}/customers?${params.toString()}`
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to load customers"
                    );
                }

                setCustomerOptions(
                    Array.isArray(result.data)
                        ? result.data
                        : []
                );
            } catch (error) {
                console.error(
                    "Customer search error:",
                    error
                );
            } finally {
                setCustomerLoading(false);
            }
        };

        const timer = setTimeout(() => {
            searchCustomers();
        }, 300);

        return () => clearTimeout(timer);
    }, [customerSearch]);

    // ============================================================
    // PART SEARCH
    // ============================================================

    useEffect(() => {
        const searchParts = async () => {
            try {
                setPartLoading(true);

                const params =
                    new URLSearchParams();

                if (partSearch.trim()) {
                    params.append(
                        "partName",
                        partSearch.trim()
                    );
                }

                const response = await fetch(
                    `${VITE_API_URL}/parts?${params.toString()}`
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to load parts"
                    );
                }

                const parts =
                    Array.isArray(result.data)
                        ? result.data
                        : [];

                setPartOptions(
                    parts.map((part: any) => ({
                        id: part.id,

                        partNumber:
                            part.partNumber ??
                            part.PartNumber ??
                            "",

                        partName:
                            part.partName ??
                            part.PartName ??
                            "",

                        partPrice: Number(
                            part.partPrice ??
                            part.PartPrice ??
                            0
                        ),
                    }))
                );
            } catch (error) {
                console.error(
                    "Part search error:",
                    error
                );
            } finally {
                setPartLoading(false);
            }
        };

        const timer = setTimeout(() => {
            searchParts();
        }, 300);

        return () => clearTimeout(timer);
    }, [partSearch]);

    // ============================================================
    // LOAD SALES ORDER FOR EDIT
    // ============================================================

    useEffect(() => {
        if (!salesInvoiceId) {
            return;
        }

        const loadSalesInvoice = async () => {
            try {
                setPageLoading(true);

                const response = await fetch(
                    `${VITE_API_URL}/sales-invoices/${salesInvoiceId}`
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to load sales Invoice"
                    );
                }

                const order: SalesInvoiceResponse =
                    result.data;

                // --------------------------------------------
                // ORDER NUMBER
                // --------------------------------------------

                setSalesInvoiceNumber(
                    order.salesInvoiceNumber || ""
                );

                // --------------------------------------------
                // ORDER DATE
                // --------------------------------------------

                setSalesInvoiceDate(
                    order.salesInvoiceDate
                        ? dayjs(
                            order.salesInvoiceDate
                        )
                        : null
                );

                // --------------------------------------------
                // CUSTOMER
                // --------------------------------------------

                setSelectedCustomer({
                    id: order.customerId,
                    name: order.customerName,
                });

                // --------------------------------------------
                // LINE ITEMS
                // --------------------------------------------

                const mappedLineItems: LineItem[] =
                    (order.lineItems || []).map(
                        (item) => ({
                            id: item.id,

                            partId:
                                item.partId,

                            partName:
                                item.partName,

                            partNumber:
                                item.partNumber || "",

                            price:
                                Number(item.price),

                            quantity:
                                Number(
                                    item.quantity
                                ) || 1,
                        })
                    );

                setLineItems(
                    mappedLineItems
                );
            } catch (error: any) {
                console.error(
                    "Load sales invoice error:",
                    error
                );

                enqueueSnackbar(
                    error.message ||
                    "Failed to load sales invoice",
                    {
                        variant: "error",
                    }
                );
            } finally {
                setPageLoading(false);
            }
        };

        loadSalesInvoice();
    }, [
        salesInvoiceId,
        enqueueSnackbar,
    ]);

    // ============================================================
    // CLEAR LINE ITEM FORM
    // ============================================================

    const clearLineItemForm = () => {
        setSelectedPart(null);
        setPartSearch("");
        setPrice("");
        setQuantity("1");
        setEditingItemId(null);
    };

    // ============================================================
    // PART CHANGE
    // ============================================================

    const handlePartChange = (
        newPart: Part | null
    ) => {
        setSelectedPart(newPart);

        if (newPart) {
            // Price automatically comes from Part Master
            setPrice(
                Number(
                    newPart.partPrice
                ).toFixed(2)
            );
        } else {
            setPrice("");
        }
    };

    // ============================================================
    // ADD / UPDATE LINE ITEM
    // ============================================================

    const handleAddLineItem = () => {
        // --------------------------------------------------------
        // PART VALIDATION
        // --------------------------------------------------------

        if (!selectedPart) {
            enqueueSnackbar(
                "Please select a part",
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // PRICE VALIDATION
        // --------------------------------------------------------

        const numericPrice =
            Number(price);

        if (
            price === "" ||
            Number.isNaN(numericPrice) ||
            numericPrice < 0
        ) {
            enqueueSnackbar(
                "Selected part does not have a valid price",
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // QUANTITY VALIDATION
        // --------------------------------------------------------

        const numericQuantity =
            Number(quantity);

        if (
            quantity === "" ||
            Number.isNaN(
                numericQuantity
            ) ||
            !Number.isInteger(
                numericQuantity
            ) ||
            numericQuantity <= 0
        ) {
            enqueueSnackbar(
                "Quantity must be a whole number greater than 0",
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // DUPLICATE PART VALIDATION
        // --------------------------------------------------------

        const duplicatePart =
            lineItems.some(
                (item) =>
                    item.partId ===
                    selectedPart.id &&
                    item.id !==
                    editingItemId
            );

        if (duplicatePart) {
            enqueueSnackbar(
                `${selectedPart.partName} is already added. Please edit the existing line item to change the quantity.`,
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // UPDATE EXISTING ITEM
        // --------------------------------------------------------

        if (editingItemId !== null) {
            setLineItems((previous) =>
                previous.map((item) =>
                    item.id ===
                    editingItemId
                        ? {
                            ...item,

                            partId:
                                selectedPart.id,

                            partNumber:
                                selectedPart.partNumber,

                            partName:
                                selectedPart.partName,

                            price:
                                numericPrice,

                            quantity:
                                numericQuantity,
                        }
                        : item
                )
            );

            enqueueSnackbar(
                "Line item updated successfully",
                {
                    variant: "success",
                }
            );
        }

        // --------------------------------------------------------
        // ADD NEW ITEM
        // --------------------------------------------------------

        else {
            const newLineItem: LineItem = {
                id: Date.now(),

                partId:
                    selectedPart.id,

                partNumber:
                    selectedPart.partNumber,

                partName:
                    selectedPart.partName,

                price:
                    numericPrice,

                quantity:
                    numericQuantity,
            };

            setLineItems((previous) => [
                ...previous,
                newLineItem,
            ]);
        }

        clearLineItemForm();
    };

    // ============================================================
    // EDIT LINE ITEM
    // ============================================================

    const handleEditLineItem = (
        item: LineItem
    ) => {
        const part: Part = {
            id: item.partId,
            partNumber: item.partNumber,
            partName: item.partName,
            partPrice: item.price,
        };

        setSelectedPart(part);

        setPartSearch(
            `${item.partNumber} - ${item.partName}`
        );

        setPrice(
            Number(
                item.price
            ).toFixed(2)
        );

        setQuantity(
            String(item.quantity)
        );

        setEditingItemId(
            item.id
        );
    };

    // ============================================================
    // DELETE LINE ITEM
    // ============================================================

    const handleDeleteLineItem = (
        id: number
    ) => {
        setLineItems((previous) =>
            previous.filter(
                (item) =>
                    item.id !== id
            )
        );

        if (editingItemId === id) {
            clearLineItemForm();
        }

        enqueueSnackbar(
            "Line item removed",
            {
                variant: "info",
            }
        );
    };

    // ============================================================
    // TOTAL
    // ============================================================

    const totalAmount =
        lineItems.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                Number(item.quantity),
            0
        );

    // ============================================================
    // SAVE
    // ============================================================

    const handleSave = async () => {
        // --------------------------------------------------------
        // CUSTOMER
        // --------------------------------------------------------

        if (!selectedCustomer) {
            enqueueSnackbar(
                "Please select a customer",
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // LINE ITEMS
        // --------------------------------------------------------

        if (lineItems.length === 0) {
            enqueueSnackbar(
                "Please add at least one line item",
                {
                    variant: "warning",
                }
            );

            return;
        }

        // --------------------------------------------------------
        // DUPLICATE FINAL VALIDATION
        // --------------------------------------------------------

        const partIds =
            lineItems.map(
                (item) => item.partId
            );

        const uniquePartIds =
            new Set(partIds);

        if (
            partIds.length !==
            uniquePartIds.size
        ) {
            enqueueSnackbar(
                "Duplicate parts are not allowed",
                {
                    variant: "error",
                }
            );

            return;
        }

        try {
            setSaving(true);

            const payload = {
                customerId:
                    selectedCustomer.id,

                lineItems:
                    lineItems.map(
                        (item) => ({
                            partId:
                                item.partId,

                            price:
                                item.price,

                            quantity:
                                item.quantity,
                        })
                    ),
            };

            // ====================================================
            // CREATE
            // ====================================================

            if (!isEditMode) {
                const response =
                    await fetch(
                        `${VITE_API_URL}/sales-invoices`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    payload
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to create sales invoice"
                    );
                }

                enqueueSnackbar(
                    `Sales Invoice ${
                        result.data
                            ?.salesInvoiceNumber ||
                        ""
                    } created successfully`,
                    {
                        variant:
                            "success",
                    }
                );
            }

            // ====================================================
            // UPDATE
            // ====================================================

            else {
                const response =
                    await fetch(
                        `${VITE_API_URL}/sales-invoices/${salesInvoiceId}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(
                                    payload
                                ),
                        }
                    );

                const result =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message ||
                        "Failed to update sales invoice"
                    );
                }

                enqueueSnackbar(
                    "Sales Invoice updated successfully",
                    {
                        variant:
                            "success",
                    }
                );
            }

            setTimeout(() => {
                navigate(
                    "/erp/sales-order"
                );
            }, 500);
        } catch (error: any) {
            console.error(
                "Save sales invoice error:",
                error
            );

            enqueueSnackbar(
                error.message ||
                "Failed to save sales invoice",
                {
                    variant: "error",
                }
            );
        } finally {
            setSaving(false);
        }
    };

    // ============================================================
    // PAGE LOADING
    // ============================================================

    if (pageLoading) {
        return (
            <Box
                sx={{
                    minHeight: 400,
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // ============================================================
    // UI
    // ============================================================

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 1400,
                mx: "auto",
            }}
        >
            {/* ===================================================
                HEADER
            ==================================================== */}

            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: "#1d2939",
                        }}
                    >
                        {isEditMode
                            ? "Edit Sales Invoice"
                            : "Create Sales Invoice"}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#667085",
                            mt: 0.5,
                        }}
                    >
                        {isEditMode
                            ? "Update customer and line item details."
                            : "Select a customer and add the required line items."}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={
                        <ArrowBack />
                    }
                    onClick={() =>
                        navigate(
                            "/erp/sales-order"
                        )
                    }
                >
                    Back
                </Button>
            </Box>

            {/* ===================================================
                SALES ORDER DETAILS
            ==================================================== */}

            <Paper
                elevation={0}
                sx={{
                    border:
                        "1px solid #e4e7ec",
                    borderRadius: 3,
                    p: 2,
                    mb: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#344054",
                        mb: 2,
                    }}
                >
                    Sales Invoice Details
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",

                            md: isEditMode
                                ? "1fr 1.5fr 1fr"
                                : "1fr",
                        },

                        gap: 2,
                    }}
                >
                    {/* SALES ORDER NUMBER */}

                    {isEditMode && (
                        <TextField
                            label="Sales Invoice Number"
                            value={
                                salesInvoiceNumber
                            }
                            size="small"
                            fullWidth
                            disabled
                        />
                    )}

                    {/* CUSTOMER */}

                    <Autocomplete
                        options={
                            customerOptions
                        }
                        value={
                            selectedCustomer
                        }
                        loading={
                            customerLoading
                        }
                        inputValue={
                            customerSearch
                        }
                        onInputChange={(
                            _event,
                            newInputValue
                        ) => {
                            setCustomerSearch(
                                newInputValue
                            );
                        }}
                        onChange={(
                            _event,
                            newValue
                        ) => {
                            setSelectedCustomer(
                                newValue
                            );
                        }}
                        getOptionLabel={(
                            option
                        ) =>
                            option?.name ||
                            ""
                        }
                        isOptionEqualToValue={(
                            option,
                            value
                        ) =>
                            option.id ===
                            value.id
                        }
                        filterOptions={(
                            options
                        ) => options}
                        noOptionsText={
                            customerSearch
                                ? "No customers found"
                                : "Search customer"
                        }
                        renderInput={(
                            params
                        ) => (
                            <TextField
                                {...params}
                                label="Customer Name"
                                placeholder="Search customer"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                    {/* SALES ORDER DATE */}

                    {isEditMode && (
                        <TextField
                            label="Sales Invoice Date"
                            value={
                                salesInvoiceDate
                                    ? salesInvoiceDate.format(
                                        "DD-MMM-YYYY"
                                    )
                                    : ""
                            }
                            size="small"
                            fullWidth
                            disabled
                        />
                    )}
                </Box>
            </Paper>

            {/* ===================================================
                LINE ITEMS
            ==================================================== */}

            <Paper
                elevation={0}
                sx={{
                    border:
                        "1px solid #e4e7ec",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                {/* LINE ITEM HEADER */}

                <Box
                    sx={{
                        px: 2,
                        py: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#344054",
                        }}
                    >
                        Line Items
                    </Typography>
                </Box>

                <Divider />

                {/* =================================================
                    LINE ITEM INPUT
                ================================================== */}

                <Box
                    sx={{
                        p: 2,
                        bgcolor: "#f9fafb",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns: {
                                xs: "1fr",

                                sm:
                                    "minmax(300px, 1fr) 140px 180px auto",
                            },

                            gap: 1.5,
                            alignItems: "center",
                        }}
                    >
                        {/* PART */}

                        <Autocomplete
                            options={
                                partOptions
                            }
                            value={
                                selectedPart
                            }
                            loading={
                                partLoading
                            }
                            inputValue={
                                partSearch
                            }
                            onInputChange={(
                                _event,
                                newInputValue
                            ) => {
                                setPartSearch(
                                    newInputValue
                                );
                            }}
                            onChange={(
                                _event,
                                newValue
                            ) => {
                                handlePartChange(
                                    newValue
                                );
                            }}
                            getOptionLabel={(
                                option
                            ) =>
                                option
                                    ? `${option.partNumber} - ${option.partName}`
                                    : ""
                            }
                            isOptionEqualToValue={(
                                option,
                                value
                            ) =>
                                option.id ===
                                value.id
                            }
                            filterOptions={(
                                options
                            ) => options}
                            noOptionsText={
                                partSearch
                                    ? "No parts found"
                                    : "Search part"
                            }
                            renderOption={(
                                props,
                                option
                            ) => (
                                <li
                                    {...props}
                                    key={
                                        option.id
                                    }
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {
                                                option.partName
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: 12,
                                                color: "#667085",
                                            }}
                                        >
                                            {
                                                option.partNumber
                                            }
                                            {" • ₹"}
                                            {Number(
                                                option.partPrice
                                            ).toLocaleString(
                                                "en-IN",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </Typography>
                                    </Box>
                                </li>
                            )}
                            renderInput={(
                                params
                            ) => (
                                <TextField
                                    {...params}
                                    label="Part Name"
                                    placeholder="Search part"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />

                        {/* QUANTITY */}

                        <TextField
                            label="Quantity"
                            value={quantity}
                            onChange={(e) => {
                                const value =
                                    e.target.value;

                                if (
                                    value === "" ||
                                    /^\d+$/.test(
                                        value
                                    )
                                ) {
                                    setQuantity(
                                        value
                                    );
                                }
                            }}
                            type="number"
                            size="small"
                            fullWidth
                            slotProps={{
                                htmlInput: {
                                min: 1,
                                step: 1,
                                },
                            }}
                        />

                        {/* PRICE */}

                        <TextField
                            label="Unit Price (₹)"
                            value={price}
                            size="small"
                            fullWidth
                            disabled
                        />

                        {/* ADD / UPDATE */}

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={
                                    editingItemId !==
                                    null ? (
                                        <Save />
                                    ) : (
                                        <Add />
                                    )
                                }
                                onClick={
                                    handleAddLineItem
                                }
                                sx={{
                                    minWidth: 120,
                                    height: 40,
                                    textTransform:
                                        "none",
                                }}
                            >
                                {editingItemId !==
                                null
                                    ? "Update"
                                    : "Add"}
                            </Button>

                            {editingItemId !==
                                null && (
                                <Tooltip title="Cancel edit">
                                    <IconButton
                                        onClick={
                                            clearLineItemForm
                                        }
                                        sx={{
                                            border:
                                                "1px solid #d0d5dd",
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* =================================================
                    TABLE
                ================================================== */}

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    bgcolor:
                                        "#f9fafb",
                                }}
                            >
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        width: 60,
                                    }}
                                >
                                    #
                                </TableCell>

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
                                    align="center"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Quantity
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Unit Price
                                </TableCell>

                                <TableCell
                                    align="right"
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Amount
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{
                                        fontWeight: 700,
                                        width: 120,
                                    }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {lineItems.length ===
                            0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={
                                            7
                                        }
                                        align="center"
                                        sx={{
                                            py: 5,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#98a2b3",
                                                fontSize: 14,
                                            }}
                                        >
                                            No line
                                            items added
                                            yet.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                lineItems.map(
                                    (
                                        item,
                                        index
                                    ) => {
                                        const lineAmount =
                                            Number(
                                                item.price
                                            ) *
                                            Number(
                                                item.quantity
                                            );

                                        return (
                                            <TableRow
                                                key={
                                                    item.id
                                                }
                                                hover
                                            >
                                                <TableCell>
                                                    {index +
                                                        1}
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.partNumber
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        item.partName
                                                    }
                                                </TableCell>

                                                <TableCell align="center">
                                                    {
                                                        item.quantity
                                                    }
                                                </TableCell>

                                                <TableCell align="right">
                                                    ₹{" "}
                                                    {Number(
                                                        item.price
                                                    ).toLocaleString(
                                                        "en-IN",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="right"
                                                    sx={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    ₹{" "}
                                                    {lineAmount.toLocaleString(
                                                        "en-IN",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleEditLineItem(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <Edit
                                                                fontSize="small"
                                                                color="primary"
                                                            />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                handleDeleteLineItem(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            <Delete
                                                                fontSize="small"
                                                                color="error"
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* =================================================
                    TOTAL
                ================================================== */}

                <Divider />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                        bgcolor: "#f9fafb",
                        gap: 3,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#475467",
                        }}
                    >
                        Total Amount
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#101828",
                        }}
                    >
                        ₹{" "}
                        {totalAmount.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
                    </Typography>
                </Box>
            </Paper>

            {/* ===================================================
                ACTION BUTTONS
            ==================================================== */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "flex-end",
                    gap: 1.5,
                    mt: 3,
                }}
            >
                <Button
                    variant="outlined"
                    onClick={() =>
                        navigate(
                            "/erp/sales-order"
                        )
                    }
                    disabled={saving}
                    sx={{
                        textTransform: "none",
                        minWidth: 100,
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    startIcon={
                        saving ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : (
                            <Save />
                        )
                    }
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        textTransform: "none",
                        minWidth: 160,
                    }}
                >
                    {saving
                        ? "Saving..."
                        : isEditMode
                        ? "Update Sales Invoice"
                        : "Save Sales Invoice"}
                </Button>
            </Box>
        </Box>
    );
}