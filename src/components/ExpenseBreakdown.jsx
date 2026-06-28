import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import MovieIcon from "@mui/icons-material/Movie";

function ExpenseBreakdown() {
  const expenses = [
    {
      category: "Food",
      amount: "₹500",
      progress: 50,
      color: "#6366F1",
      icon: <FastfoodIcon sx={{ color: "#6366F1" }} />,
    },
    {
      category: "Rent",
      amount: "₹1500",
      progress: 75,
      color: "#10B981",
      icon: <HomeIcon sx={{ color: "#10B981" }} />,
    },
    {
      category: "Travel",
      amount: "₹2000",
      progress: 90,
      color: "#F59E0B",
      icon: <FlightIcon sx={{ color: "#F59E0B" }} />,
    },
    {
      category: "Entertainment",
      amount: "₹300",
      progress: 30,
      color: "#EF4444",
      icon: <MovieIcon sx={{ color: "#EF4444" }} />,
    },
  ];

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Expense Breakdown
        </Typography>

        {expenses.map((expense, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {expense.icon}

                <Typography fontWeight={600}>
                  {expense.category}
                </Typography>
              </Box>

              <Typography fontWeight="bold">
                {expense.amount}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={expense.progress}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: expense.color,
                },
              }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ float: "right", mt: 0.5 }}
            >
              {expense.progress}%
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ExpenseBreakdown;