import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddIncome() {
  const navigate = useNavigate();

  const [income, setIncome] = useState({
    source: "",
    amount: "",
    incomeDate: "",
  });

  const handleChange = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://localhost:7024/api/Income/addIncome",
        income,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Income Added Successfully");
      navigate("/income");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add income.");
    }
  };

  return (
  <Box
    sx={{
      minHeight: "100vh",
      bgcolor: "#F5F7FB",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: 4,
    }}
  >
    <Card
      sx={{
        width: 800,
        maxWidth: "95%",
        borderRadius: 4,
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ p: 5 }}>
        {/* Back Button */}

        <Button
          component={Link}
          to="/income"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3,
            textTransform: "none",
          }}
        >
          Back to Income
        </Button>

        {/* Heading */}

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Add New Income
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Record your salary, bonus, freelancing income or any
          other source.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Income Source"
              name="source"
              value={income.source}
              onChange={handleChange}
              placeholder="Salary, Bonus, Freelancing..."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              name="amount"
              value={income.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Income Date"
              name="incomeDate"
              value={income.incomeDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
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
            to="/income"
            variant="outlined"
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              backgroundColor: "#4F46E5",
              "&:hover": {
                backgroundColor: "#4338CA",
              },
            }}
          >
            Save Income
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
);
}


export default AddIncome;