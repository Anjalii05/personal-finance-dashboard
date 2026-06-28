import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

function BudgetProgress() {
  const budget = 50000;
  const spent = 30000;
  const remaining = budget - spent;
  const progress = (spent / budget) * 100;

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Budget Progress
          </Typography>

          <AccountBalanceWalletIcon
            sx={{
              color: "#4F46E5",
              fontSize: 35,
            }}
          />
        </Box>

        {/* Budget */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
        >
          <Typography color="text.secondary">
            Total Budget
          </Typography>

          <Typography fontWeight="bold">
            ₹{budget.toLocaleString()}
          </Typography>
        </Box>

        {/* Spent */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={1}
        >
          <Typography color="text.secondary">
            Spent
          </Typography>

          <Typography
            fontWeight="bold"
            color="error.main"
          >
            ₹{spent.toLocaleString()}
          </Typography>
        </Box>

        {/* Remaining */}
        <Box
          display="flex"
          justifyContent="space-between"
          mb={3}
        >
          <Typography color="text.secondary">
            Remaining
          </Typography>

          <Typography
            fontWeight="bold"
            color="success.main"
          >
            ₹{remaining.toLocaleString()}
          </Typography>
        </Box>

        {/* Progress */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#E5E7EB",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#4F46E5",
            },
          }}
        />

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {Math.round(progress)}% of budget used
          </Typography>

          <Chip
            label="On Track"
            color="success"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default BudgetProgress;