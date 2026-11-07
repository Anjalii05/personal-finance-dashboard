
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  InputAdornment,
  Divider,
  Alert,
} from "@mui/material";

import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const SetBudget = () => {
  const navigate = useNavigate();
  const currentDate = new Date();

  const [budget, setBudget] = useState({
    amount: "",
    month: currentDate.toLocaleString("en-US", {
      month: "long",
    }),
    year: String(currentDate.getFullYear()),
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBudget((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const inputSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      width: "100%",
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      minHeight: 54,
      "& fieldset": {
        borderColor: "#D9DEE8",
      },
      "&:hover fieldset": {
        borderColor: "#A5B4FC",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4F46E5",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#4F46E5",
    },
  };

  const labelSx = {
    mb: 1,
    fontWeight: 600,
    color: "#374151",
    fontSize: "0.9rem",
  };

  const requiredMark = (
    <Box component="span" sx={{ color: "#DC2626" }}>
      {" "}*
    </Box>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const amount = Number(budget.amount);
    const year = Number(budget.year);

    if (
      !budget.amount ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setError("Please enter a valid budget amount.");
      return;
    }

    if (!months.some((m) => m.value === budget.month)) {
      setError("Please select a valid month.");
      return;
    }

    if (
      !Number.isInteger(year) ||
      year < 2000 ||
      year > 2100
    ) {
      setError("Please enter a valid year.");
      return;
    }

    setLoading(true);

    try {
      // Payload matching BudgetDto
      const payload = {
        month: budget.month,
        amount: amount,
        year: year,
        notes: budget.notes.trim() || null,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        "https://manageexpense.runasp.net/api/Budget/setBudget",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/Budget");
    } catch (err) {
      console.error("Error saving budget:", err);

      setError(
        err.response?.data?.message ||
          "Unable to save budget. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: "1 1 0%",
          width: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#F8FAFC",
          overflowX: "hidden",
        }}
      >
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            maxWidth: 1200,
            boxSizing: "border-box",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          {/* Page Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 3,
              width: "100%",
              minWidth: 0,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#111827",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "1.875rem",
                  },
                  lineHeight: 1.3,
                  overflowWrap: "break-word",
                }}
              >
                Set Monthly Budget
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#6B7280",
                  mt: 0.75,
                  fontSize: "0.95rem",
                }}
              >
                Plan your monthly spending and keep your
                finances on track.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/Budget")}
              sx={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                borderColor: "#D1D5DB",
                color: "#374151",
                borderRadius: 2,
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#4F46E5",
                  color: "#4F46E5",
                  bgcolor: "#EEF2FF",
                },
              }}
            >
              Back to Budget
            </Button>
          </Box>

          {/* Budget Form Card */}
          <Card
            elevation={0}
            sx={{
              width: "100%",
              minWidth: 0,
              boxSizing: "border-box",
              border: "1px solid #E5E7EB",
              borderRadius: 3,
              boxShadow:
                "0px 4px 16px rgba(15, 23, 42, 0.04)",
              bgcolor: "#FFFFFF",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2.5, sm: 3.5, md: 4 },
                "&:last-child": {
                  pb: { xs: 2.5, sm: 3.5, md: 4 },
                },
              }}
            >
              {/* Form Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    borderRadius: 2,
                    bgcolor: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccountBalanceWalletIcon
                    sx={{
                      color: "#4F46E5",
                      fontSize: 25,
                    }}
                  />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    Budget Details
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#6B7280",
                      mt: 0.25,
                    }}
                  >
                    Enter your monthly budget information.
                  </Typography>
                </Box>
              </Box>

              <Divider
                sx={{
                  mb: 3,
                  borderColor: "#E5E7EB",
                }}
              />

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit}>
                {error && (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  sx={{
                    width: "100%",
                  }}
                >
                  {/* Budget Amount */}
                  <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
                    <Typography sx={labelSx}>
                      Budget Amount{requiredMark}
                    </Typography>

                    <TextField
                      fullWidth
                      name="amount"
                      type="number"
                      placeholder="Enter your monthly budget"
                      value={budget.amount}
                      onChange={handleChange}
                      required
                      inputProps={{
                        min: 0.01,
                        step: "0.01",
                      }}
                      sx={inputSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon
                              sx={{ color: "#6B7280" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.75,
                        color: "#9CA3AF",
                      }}
                    >
                      Set your maximum monthly spending limit.
                    </Typography>
                  </Grid>

                  {/* Month */}
                  <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
                    <Typography sx={labelSx}>
                      Month{requiredMark}
                    </Typography>

                    <TextField
                      select
                      fullWidth
                      name="month"
                      value={budget.month}
                      onChange={handleChange}
                      required
                      sx={inputSx}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon
                              sx={{ color: "#6B7280" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {months.map((month) => (
                        <MenuItem
                          key={month.value}
                          value={month.value}
                        >
                          {month.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Year */}
                  <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
                    <Typography sx={labelSx}>
                      Year{requiredMark}
                    </Typography>

                    <TextField
                      fullWidth
                      type="number"
                      name="year"
                      value={budget.year}
                      onChange={handleChange}
                      required
                      inputProps={{
                        min: 2000,
                        max: 2100,
                        step: 1,
                      }}
                      sx={inputSx}
                    />
                  </Grid>

                  {/* Notes */}
                  <Grid item xs={12} sx={{ minWidth: 0 }}>
                    <Typography sx={labelSx}>
                      Notes{" "}
                      <Box
                        component="span"
                        sx={{
                          color: "#9CA3AF",
                          fontWeight: 400,
                          fontSize: "0.8rem",
                        }}
                      >
                        (Optional)
                      </Box>
                    </Typography>

                    <TextField
                      fullWidth
                      multiline
                      minRows={3}
                      name="notes"
                      placeholder="Add any notes about your budget..."
                      value={budget.notes}
                      onChange={handleChange}
                      sx={{
                        ...inputSx,
                        "& .MuiOutlinedInput-root": {
                          ...inputSx["& .MuiOutlinedInput-root"],
                          minHeight: "auto",
                          alignItems: "flex-start",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Form Actions */}
                <Divider
                  sx={{
                    my: 3,
                    borderColor: "#E5E7EB",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 1.5,
                    flexDirection: {
                      xs: "column-reverse",
                      sm: "row",
                    },
                    width: "100%",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/Budget")}
                    disabled={loading}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                      borderColor: "#D1D5DB",
                      color: "#374151",
                      borderRadius: 2,
                      px: 3,
                      py: 1.3,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        borderColor: "#9CA3AF",
                        bgcolor: "#F9FAFB",
                      },
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={<SaveIcon />}
                    sx={{
                      width: {
                        xs: "100%",
                        sm: "auto",
                      },
                      bgcolor: "#4F46E5",
                      color: "#FFFFFF",
                      borderRadius: 2,
                      px: 3,
                      py: 1.3,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#4338CA",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {loading ? "Saving..." : "Save Budget"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};

export default SetBudget;
