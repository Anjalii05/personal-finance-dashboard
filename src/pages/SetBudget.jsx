import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { Link } from "react-router-dom";
import { useState } from "react";

function SetBudget() {
  const [budget, setBudget] = useState({
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  });

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(budget);

    // Call your API here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Card
        sx={{
          width: 700,
          maxWidth: "95%",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Button
            component={Link}
            to="/budget"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 3,
              textTransform: "none",
            }}
          >
            Back to Budget
          </Button>

          <Box textAlign="center" mb={4}>
            <AccountBalanceWalletIcon
              sx={{
                fontSize: 60,
                color: "#4F46E5",
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
              mt={2}
            >
              Set Monthly Budget
            </Typography>

            <Typography color="text.secondary">
              Set a spending limit to manage your finances.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget Amount"
                name="amount"
                type="number"
                value={budget.amount}
                onChange={handleChange}
                placeholder="Enter monthly budget"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Month"
                name="month"
                value={budget.month}
                onChange={handleChange}
              >
                <MenuItem value="1">January</MenuItem>
                <MenuItem value="2">February</MenuItem>
                <MenuItem value="3">March</MenuItem>
                <MenuItem value="4">April</MenuItem>
                <MenuItem value="5">May</MenuItem>
                <MenuItem value="6">June</MenuItem>
                <MenuItem value="7">July</MenuItem>
                <MenuItem value="8">August</MenuItem>
                <MenuItem value="9">September</MenuItem>
                <MenuItem value="10">October</MenuItem>
                <MenuItem value="11">November</MenuItem>
                <MenuItem value="12">December</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={budget.year}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 5,
            }}
          >
            <Button
              component={Link}
              to="/budget"
              variant="outlined"
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#4F46E5",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  backgroundColor: "#4338CA",
                },
              }}
            >
              Save Budget
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SetBudget;