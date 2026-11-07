import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Expenses", icon: <AccountBalanceWalletIcon />, path: "/expenses" },
    { name: "Income", icon: <AttachMoneyIcon />, path: "/income" },
    { name: "Budget", icon: <SavingsIcon />, path: "/budget" },
    { name: "Reports", icon: <AssessmentIcon />, path: "/reports" },
    { name: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  return (
    <Box
      sx={{
        width: 260,
        minHeight: "100vh",
        bgcolor: "#fff",
        borderRight: "1px solid #E5E7EB",
        p: 3,
        boxSizing: "border-box",
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
        color="#4F46E5"
        mb={5}
      >
        💰 Finance Tracker
      </Typography>

      {menuItems.map((item) => {

        const active = location.pathname === item.path;

        return (
          <Box
            component={Link}
            to={item.path}
            key={item.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              mb: 1,
              borderRadius: 3,
              textDecoration: "none",

              bgcolor: active ? "#EEF2FF" : "transparent",
              color: active ? "#4F46E5" : "#64748B",
              fontWeight: active ? 600 : 500,

              "&:hover": {
                bgcolor: "#EEF2FF",
                color: "#4F46E5",
              },
            }}
          >
            {item.icon}

            <Typography fontWeight="inherit">
              {item.name}
            </Typography>
          </Box>
        );
      })}

    </Box>
  );
}

export default Sidebar;