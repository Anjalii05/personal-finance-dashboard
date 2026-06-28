import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

function AddExpense() {
  return (
    <>
      {/* Back Button */}

      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/expenses"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none" }}
        >
          Back to Expenses
        </Button>
      </Box>

      {/* Page Header */}

      <Typography variant="h4" fontWeight="bold">
        Add New Expense
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Record a new expense to keep track of your spending.
      </Typography>

      {/* Form */}

      <Card sx={{ maxWidth: 700, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>

          <TextField
            label="Expense Title"
            placeholder="Enter expense title"
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            label="Amount"
            type="number"
            placeholder="Enter amount"
            fullWidth
            sx={{ mb: 3 }}
          />

          <TextField
            select
            label="Category"
            fullWidth
            defaultValue=""
            sx={{ mb: 3 }}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Bills">Bills</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
          </TextField>

          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Notes"
            placeholder="Write something..."
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 4 }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>

            <Button
              component={Link}
              to="/expenses"
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: "#4F46E5",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#4338CA",
                },
              }}
            >
              Save Expense
            </Button>

          </Box>

        </CardContent>
      </Card>
    </>
  );
}

export default AddExpense;