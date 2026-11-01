import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import HomeIcon from "@mui/icons-material/Home";
import FlightIcon from "@mui/icons-material/Flight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function RecentTransactions({ expenses = [], incomes = [] }) {
  // Convert expense data
  const expenseTransactions = expenses.map((expense) => ({
    category: expense.category,
    amount: Number(expense.amount),
    date: expense.expense_date,
    type: "expense",
  }));

  // Convert income data
  const incomeTransactions = incomes.map((income) => ({
    category: income.source,
    amount: Number(income.amount),
    date: income.income_date,
    type: "income",
  }));

  // Merge both arrays, sort by latest date and keep only latest 5
  const transactions = [...expenseTransactions, ...incomeTransactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "food":
        return <FastfoodIcon color="warning" />;

      case "rent":
        return <HomeIcon color="primary" />;

      case "travel":
        return <FlightIcon color="secondary" />;

      case "salary":
        return <AccountBalanceWalletIcon color="success" />;

      default:
        return <AccountBalanceWalletIcon color="action" />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Recent Transactions
        </Typography>

        <IconButton>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                Category
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Amount
              </TableCell>

              <TableCell sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F8FAFC",
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      {getIcon(transaction.category)}

                      <Typography fontWeight={500}>
                        {transaction.category}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={transaction.type}
                      color={
                        transaction.type === "income"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      color:
                        transaction.type === "income"
                          ? "#16A34A"
                          : "#DC2626",
                      fontWeight: "bold",
                    }}
                  >
                    {transaction.type === "income"
                      ? `+₹${transaction.amount}`
                      : `-₹${transaction.amount}`}
                  </TableCell>

                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No recent transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecentTransactions;