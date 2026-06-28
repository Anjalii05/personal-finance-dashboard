import { Card, CardContent, Typography, Box } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsIcon from "@mui/icons-material/Savings";
import PaidIcon from "@mui/icons-material/Paid";

function SummaryCard({ title, amount }) {
  const getIcon = () => {
    switch (title) {
      case "Total Income":
        return <AccountBalanceWalletIcon sx={{ fontSize: 32, color: "#4F46E5" }} />;
      case "Total Expenses":
        return <TrendingUpIcon sx={{ fontSize: 32, color: "#EF4444" }} />;
      case "Net Worth":
        return <SavingsIcon sx={{ fontSize: 32, color: "#10B981" }} />;
      case "Savings Rate":
        return <PaidIcon sx={{ fontSize: 32, color: "#F59E0B" }} />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              fontWeight={500}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mt: 1 }}
            >
              ${amount}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#22C55E",
                fontWeight: 600,
                mt: 1,
                display: "block",
              }}
            >
              ↑ 12% from last month
            </Typography>
          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "#EEF2FF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getIcon()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;