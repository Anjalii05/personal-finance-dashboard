import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const expenses = [
  {
    title: "Lunch",
    category: "Food",
    amount: "₹500",
    date: "Today",
    status: "Paid",
  },
  {
    title: "Uber",
    category: "Travel",
    amount: "₹350",
    date: "Yesterday",
    status: "Paid",
  },
  {
    title: "Rent",
    category: "Bills",
    amount: "₹15,000",
    date: "1 Jun 2026",
    status: "Pending",
  },
  {
    title: "Movie",
    category: "Entertainment",
    amount: "₹800",
    date: "15 Jun 2026",
    status: "Paid",
  },
  {
    title: "Shopping",
    category: "Shopping",
    amount: "₹2,400",
    date: "20 Jun 2026",
    status: "Paid",
  },
];

function Expenses() {
  return (
    <>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Expenses
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Manage all your expenses here.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
           component={Link}
           to="/add-expense"
          sx={{
            bgcolor: "#4F46E5",
            px: 3,
            py: 1.3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#4338CA",
            },
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Search & Filter */}

      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Search Expenses"
          fullWidth
        />

        <TextField
          select
          label="Category"
          defaultValue=""
          sx={{ width: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </TextField>

        <TextField
          select
          label="Month"
          defaultValue=""
          sx={{ width: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Jan">January</MenuItem>
          <MenuItem value="Feb">February</MenuItem>
          <MenuItem value="Mar">March</MenuItem>
          <MenuItem value="Apr">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="Jun">June</MenuItem>
        </TextField>
      </Box>

      {/* Expense Table */}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Table>

          <TableHead>
            <TableRow sx={{ bgcolor: "#F8FAFC" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  "&:hover": {
                    bgcolor: "#F8FAFC",
                  },
                }}
              >
                <TableCell>{expense.title}</TableCell>

                <TableCell>{expense.category}</TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#EF4444",
                  }}
                >
                  {expense.amount}
                </TableCell>

                <TableCell>{expense.date}</TableCell>

                <TableCell>
                  <Chip
                    label={expense.status}
                    color={
                      expense.status === "Paid"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                  color="primary"
                  component={Link}
                  to={`/edit-expense/${expense.id}`}  
                >
                  <EditIcon />
                </IconButton>

                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
}

export default Expenses;