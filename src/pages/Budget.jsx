import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Card,
  Typography,
  Button,
  LinearProgress,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function Budget() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentDate = new Date();
    return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  });

  const [summary, setSummary] = useState({
    monthlyBudget: 0,
    amountSpent: 0,
    remaining: 0,
    progressPercentage: 0,
    budgetHealth: "No budget set",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [month, year] = selectedMonth.split("-").map(Number);

  // Generate current and previous 11 months dynamically
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - index,
      1
    );

    return {
      value: `${date.getMonth() + 1}-${date.getFullYear()}`,
      label: date.toLocaleString("en-IN", {
        month: "long",
        year: "numeric",
      }),
    };
  });

  const monthLabel = new Date(year, month - 1).toLocaleString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://localhost:7024/api/Budget/dashboard",
          {
            params: { month, year },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSummary(response.data);
      } catch (err) {
        console.error("Dashboard API error:", err);

        setError(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data?.message ||
                "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [month, year]);

  const budget = Number(summary.monthlyBudget) || 0;
  const spent = Number(summary.amountSpent) || 0;
  const remaining = Number(summary.remaining) || 0;
  const percentage = Number(summary.progressPercentage) || 0;
  const health = summary.budgetHealth || "No budget set";

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const isHealthy = health === "On track";

  const healthColor =
    health === "On track"
      ? "#16A34A"
      : health === "Near budget limit"
      ? "#D97706"
      : "#DC2626";

  const healthBackground =
    health === "On track"
      ? "#DCFCE7"
      : health === "Near budget limit"
      ? "#FEF3C7"
      : "#FEE2E2";

  const cards = [
    {
      title: "Monthly Budget",
      value: budget,
      Icon: AccountBalanceWalletOutlinedIcon,
      bg: "#EEF2FF",
      color: "#4F46E5",
    },
    {
      title: "Amount Spent",
      value: spent,
      Icon: TrendingUpIcon,
      bg: "#FFF1F2",
      color: "#EF4444",
    },
    {
      title: "Remaining",
      value: remaining,
      Icon: SavingsOutlinedIcon,
      bg: "#ECFDF5",
      color: "#10B981",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Navbar />

        {/* Month and Set Budget */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Select
            size="small"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{
              minWidth: 190,
              bgcolor: "#fff",
              borderRadius: 2,
            }}
          >
            {monthOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/set-budget"
            sx={{
              bgcolor: "#4F46E5",
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 600,
              px: 2.5,
              py: 1.2,
              boxShadow: "0 4px 12px rgba(79,70,229,0.25)",
              "&:hover": {
                bgcolor: "#4338CA",
              },
            }}
          >
            Set Budget
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <CircularProgress size={28} />
          </Box>
        )}

        {/* Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {cards.map(({ title, value, Icon, bg, color }) => (
            <Card
              key={title}
              sx={{
                p: 3,
                borderRadius: 4,
                minHeight: 120,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1.5,
                  height: "100%",
                }}
              >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 16,
                      color: "#64748B",
                    }}
                  >
                    {title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { xs: 21, sm: 24 },
                      fontWeight: 500,
                      mt: 0.5,
                      lineHeight: 1.4,
                      color:
                        title === "Remaining" ? "#059669" : "#1E293B",
                      overflowWrap: "anywhere",
                    }}
                  >
                    ₹{formatAmount(value)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#94A3B8",
                      mt: 0.5,
                    }}
                  >
                    {monthLabel}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ color }} />
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Progress and Health */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr",
            },
            gap: 3,
            mt: 3,
          }}
        >
          {/* Budget Progress */}
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              minHeight: 190,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="700">
                  Budget Progress
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Your spending for {monthLabel}
                </Typography>
              </Box>

              <Typography
                fontWeight="700"
                sx={{ color: "#4F46E5", fontSize: 18 }}
              >
                {percentage}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.min(Math.max(percentage, 0), 100)}
              sx={{
                height: 12,
                borderRadius: 10,
                bgcolor: "#DBEAFE",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 10,
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 1.5,
                gap: 1,
              }}
            >
              <Typography variant="body2">
                Spent ₹{formatAmount(spent)}
              </Typography>

              <Typography variant="body2">
                Budget ₹{formatAmount(budget)}
              </Typography>
            </Box>
          </Card>

          {/* Budget Health */}
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              minHeight: 190,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight="700" mb={2}>
              Budget Health
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: healthBackground,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {isHealthy ? (
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: 32, color: healthColor }}
                  />
                ) : (
                  <WarningAmberIcon
                    sx={{ fontSize: 32, color: healthColor }}
                  />
                )}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  fontWeight="700"
                  sx={{ color: healthColor }}
                >
                  {health}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  ₹{formatAmount(remaining)} remaining this month.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

export default Budget;