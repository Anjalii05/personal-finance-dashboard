import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import TitleIcon from "@mui/icons-material/Title";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from "@mui/icons-material/Notes";

function AddExpense() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [notes, setNotes] = useState("");
  return (

    
    <>
      <Button
        component={Link}
        to="/expenses"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 3,
          color: "#4F46E5",
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Back to Expenses
      </Button>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Add New Expense
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Record your daily expenses and manage your finances smarter.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 700,
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <TextField
              required
              fullWidth
              label="Expense Title"
              placeholder="Dinner with friends"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              fullWidth
              type="number"
              label="Amount"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              select
              fullWidth
              label="Category"
              defaultValue=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Food">🍔 Food</MenuItem>
              <MenuItem value="Travel">✈ Travel</MenuItem>
              <MenuItem value="Shopping">🛒 Shopping</MenuItem>
              <MenuItem value="Bills">💡 Bills</MenuItem>
              <MenuItem value="Entertainment">🎬 Entertainment</MenuItem>
            </TextField>

            <TextField
              required
              fullWidth
              type="date"
              label="Expense Date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}  
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              placeholder="Example: Dinner with college friends..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}  
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ alignSelf: "flex-start", mt: 1 }}
                  >
                    <NotesIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                component={Link}
                to="/expenses"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: "#4F46E5",
                  px: 4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
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
      </Box>
    </>
  );
}

export default AddExpense;