import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";

function Sidebar() {

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Expenses", icon: <AccountBalanceWalletIcon /> },
    { name: "Income", icon: <AttachMoneyIcon /> },
    { name: "Budget", icon: <SavingsIcon /> },
    { name: "Reports", icon: <AssessmentIcon /> },
    { name: "Profile", icon: <PersonIcon /> },
  ];

  return (
    <>
      <Box sx={{ width: 260, minHeight: "100vh", bgcolor: "#fff", borderRight: "1px solid #E5E7EB", p: 3 }}>

        <Typography variant="h5" fontWeight="bold" color="#4F46E5" mb={5}>
          💰 Finance Tracker
        </Typography>

        {menuItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              mb: 1,
              borderRadius: 3,
              cursor: "pointer",
              transition: "0.3s",
              bgcolor: item.name === "Dashboard" ? "#EEF2FF" : "transparent",
              color: item.name === "Dashboard" ? "#4F46E5" : "#64748B",
              fontWeight: item.name === "Dashboard" ? 600 : 500,
              "&:hover": {
                bgcolor: "#EEF2FF",
                color: "#4F46E5",
              },
            }}
          >
            {item.icon}
            <Typography fontWeight="inherit">{item.name}</Typography>
          </Box>
        ))}

      </Box>
    </>
  );
}

export default Sidebar;