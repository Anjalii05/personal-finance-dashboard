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
import CategoryIcon from "@mui/icons-material/Category";

function ExpenseBreakdown({ expenses }) {
  const categoryIcons = {
    Food: <FastfoodIcon sx={{ color: "#6366F1" }} />,
    Rent: <HomeIcon sx={{ color: "#10B981" }} />,
    Travel: <FlightIcon sx={{ color: "#F59E0B" }} />,
    Entertainment: <MovieIcon sx={{ color: "#EF4444" }} />,
  };

  const colors = [
    "#6366F1",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
  ];

  // Total expense of current month
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // Group by category
  const expenseData = Object.values(
    expenses.reduce((acc, expense) => {
      const category = expense.category;

      if (!acc[category]) {
        acc[category] = {
          category,
          amount: 0,
        };
      }

      acc[category].amount += Number(expense.amount);

      return acc;
    }, {})
  );

  return (
    <Card
      sx={{
        mt: 4,
        width: "100%",
        height: "100%",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Expense Breakdown
        </Typography>

        {expenseData.map((expense, index) => {
          const progress =
            totalExpense > 0
              ? (expense.amount / totalExpense) * 100
              : 0;

          return (
            <Box key={index} sx={{ mb: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {categoryIcons[expense.category] || (
                    <CategoryIcon
                      sx={{
                        color: colors[index % colors.length],
                      }}
                    />
                  )}

                  <Typography fontWeight={600}>
                    {expense.category}
                  </Typography>
                </Box>

                <Typography fontWeight="bold">
                  ₹{expense.amount.toLocaleString()}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "#E5E7EB",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      colors[index % colors.length],
                  },
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ float: "right", mt: 0.5 }}
              >
                {progress.toFixed(1)}%
              </Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default ExpenseBreakdown;