import { Box , Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsIcon from '@mui/icons-material/Savings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
function sidebar(){
  return(
    <>
    <Box sx={{ width: "250px",minHeight: "100vh", backgroundColor: "#ffffff", borderRight: "1px solid #e5e7eb",}} >
    <Typography variant="h6" sx={{  fontWeight: 700, color: "#4F46E5", }}>Finance Tracker</Typography>
     <Box sx={{ display: "flex", flexDirection: "column",mt: 2, gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><DashboardIcon /><Typography>Dashboard</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><AccountBalanceWalletIcon /><Typography>Expenses</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><AttachMoneyIcon /><Typography>Income</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><SavingsIcon /><Typography>Budget</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><AssessmentIcon /><Typography>Reports</Typography></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><PersonIcon /><Typography>Profile</Typography></Box>
      </Box>
    </Box>
    </>
  )
}
export default sidebar;