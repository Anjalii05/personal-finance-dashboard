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

function RecentTransactions() {
  const transactions = [
    {
      category: "Food",
      amount: "-$500",
      date: "Today",
      type: "expense",
    },
    {
      category: "Rent",
      amount: "-$1500",
      date: "Yesterday",
      type: "expense",
    },
    {
      category: "Salary",
      amount: "+$5000",
      date: "18 June 2026",
      type: "income",
    },
    {
      category: "Travel",
      amount: "-$2000",
      date: "15 June 2026",
      type: "expense",
    },
  ];

  const getIcon = (category) => {
    switch (category) {
      case "Food":
        return <FastfoodIcon color="warning" />;
      case "Rent":
        return <HomeIcon color="primary" />;
      case "Salary":
        return <AccountBalanceWalletIcon color="success" />;
      case "Travel":
        return <FlightIcon color="secondary" />;
      default:
        return null;
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
            {transactions.map((transaction, index) => (
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
                  {transaction.amount}
                </TableCell>

                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default RecentTransactions;