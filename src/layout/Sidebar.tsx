
import { useEffect, useState, type ReactElement } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
  ShoppingCart,
  Description,
  AutoAwesome,
  People,
  Inventory2,
  MenuOpen,
  Menu,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const [collapsed, setCollapsed] = useState(false);
  const [masterOpen, setMasterOpen] = useState(true);
  const [salesOpen, setSalesOpen] = useState(true);

  // Automatically collapse when the screen becomes smaller.
  useEffect(() => {
    setCollapsed(isSmallScreen);
  }, [isSmallScreen]);

  const isCompact = collapsed;
  const sidebarWidth = isCompact ? 68 : 240;

  const isActive = (path: string) =>
    location.pathname === path;

  const toggleSidebar = () => {
    setCollapsed((previous) => !previous);
  };

  const toggleMasters = () => {
    if (isCompact) {
      setCollapsed(false);
      return;
    }

    setMasterOpen((previous) => !previous);
  };

  const toggleSales = () => {
    if (isCompact) {
      setCollapsed(false);
      return;
    }

    setSalesOpen((previous) => !previous);
  };

  const itemSx = (path?: string) => ({
    minHeight: 48,
    mx: 1,
    mb: 0.5,
    px: isCompact ? 1 : 2,
    borderRadius: 2,
    justifyContent: isCompact ? "center" : "initial",
    backgroundColor:
      path && isActive(path) ? "#DBEAFE" : "transparent",
    color:
      path && isActive(path) ? "#1E40AF" : "#333333",
    "&:hover": {
      backgroundColor: "#EFF6FF",
    },
    "&.Mui-selected": {
      backgroundColor: "#DBEAFE",
      color: "#1E40AF",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#BFDBFE",
    },
  });

  const iconSx = {
    minWidth: isCompact ? 0 : 40,
    mr: isCompact ? 0 : 1,
    justifyContent: "center",
    color: "inherit",
  };

  const renderTooltip = (
    label: string,
    child: ReactElement
  ) => (
    <Tooltip
      title={isCompact ? label : ""}
      placement="right"
      arrow
    >
      {child}
    </Tooltip>
  );

  const renderNavItem = (
    label: string,
    path: string,
    icon: ReactElement
  ) => (
    <ListItemButton
      key={path}
      onClick={() => navigate(path)}
      selected={isActive(path)}
      sx={{
        ...itemSx(path),
        pl: isCompact ? 1 : 5,
      }}
    >
      <ListItemIcon sx={iconSx}>
        {icon}
      </ListItemIcon>

      {!isCompact && (
        <ListItemText
          primary={label}
         slotProps={{
                  primary: {
                    sx: {
                      fontSize: 16,
                      whiteSpace: "nowrap",
                    },
                  },
                }}
        />
      )}
    </ListItemButton>
  );

  return (
    <Box
      component="aside"
      sx={{
        flexShrink: 0,
        width: sidebarWidth,
        minWidth: sidebarWidth,
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        overflowX: "hidden",
        overflowY: "auto",
        transition:
          "width 0.2s ease, min-width 0.2s ease",
      }}
    >
      {/* Space reserved for the fixed header */}
      <Toolbar />

      {/* Toggle button remains visible in both modes */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isCompact ? "center" : "flex-end",
          alignItems: "center",
          px: 1,
          py: 1,
          flexShrink: 0,
        }}
      >
        <Tooltip
          title={
            isCompact
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          placement="right"
          arrow
        >
          <IconButton
            onClick={toggleSidebar}
            size="small"
            aria-label={
              isCompact
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            sx={{
              color: "#1E40AF",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#EFF6FF",
              },
            }}
          >
            {isCompact ? <Menu /> : <MenuOpen />}
          </IconButton>
        </Tooltip>
      </Box>

      <List disablePadding sx={{ flexGrow: 1 }}>
        {/* Masters parent menu */}
        {renderTooltip(
          "Masters",
          <ListItemButton
            onClick={toggleMasters}
            aria-expanded={!isCompact && masterOpen}
            sx={itemSx()}
          >
            <ListItemIcon
              sx={{
                ...iconSx,
                color: "#1E40AF",
              }}
            >
              <Inventory2 />
            </ListItemIcon>

            {!isCompact && (
              <>
                <ListItemText
                  primary="Masters"
                 slotProps={{
                  primary: {
                    sx: {
                      fontSize: 16,
                      whiteSpace: "nowrap",
                    },
                  },
                }}
                />

                {masterOpen ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItemButton>
        )}

        {/* Masters submenu */}
        <Collapse
          in={!isCompact && masterOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {renderNavItem(
              "Customers",
              "/erp/customers",
              <People />
            )}

            {renderNavItem(
              "Parts",
              "/erp/parts",
              <Inventory2 />
            )}
          </List>
        </Collapse>

        {/* Sales parent menu */}
        {renderTooltip(
          "Sales",
          <ListItemButton
            onClick={toggleSales}
            aria-expanded={!isCompact && salesOpen}
            sx={itemSx()}
          >
            <ListItemIcon
              sx={{
                ...iconSx,
                color: "#1E40AF",
              }}
            >
              <ShoppingCart />
            </ListItemIcon>

            {!isCompact && (
              <>
                <ListItemText
                  primary="Sales"
                 slotProps={{
                  primary: {
                    sx: {
                      fontSize: 16,
                      whiteSpace: "nowrap",
                    },
                  },
                }}
                />

                {salesOpen ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItemButton>
        )}

        {/* Sales submenu */}
        <Collapse
          in={!isCompact && salesOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            {renderNavItem(
              "Sales Invoice",
              "/erp/sales-order",
              <Description />
            )}
          </List>
        </Collapse>

        {/* AI Report */}
        {renderTooltip(
          "AI Report",
          <ListItemButton
            onClick={() => navigate("/erp/ai-report")}
            selected={isActive("/erp/ai-report")}
            sx={{
              ...itemSx("/erp/ai-report"),
              mt: 0.5,
            }}
          >
            <ListItemIcon
              sx={{
                ...iconSx,
                color: "#1E40AF",
              }}
            >
              <AutoAwesome />
            </ListItemIcon>

            {!isCompact && (
              <ListItemText
                primary="AI Report"
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 16,
                      whiteSpace: "nowrap",
                    },
                  },
                }}
              />
            )}
          </ListItemButton>
        )}
      </List>
    </Box>
  );
}