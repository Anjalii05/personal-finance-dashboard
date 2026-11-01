
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Reports() {
  const getLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();

  const [fromDate, setFromDate] = useState(
    getLocalDate(new Date(today.getFullYear(), today.getMonth(), 1))
  );
  const [toDate, setToDate] = useState(getLocalDate(today));

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleGenerateReport = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both dates.");
      return;
    }

    if (fromDate > toDate) {
      setError("From Date cannot be greater than To Date.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setGenerated(false);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://localhost:7024/api/Reports/transactions",
        {
          params: { fromDate, toDate },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomes(response.data.incomes || []);
      setExpenses(response.data.expenses || []);
      setGenerated(true);
    } catch (err) {
      console.error("Report error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch report data."
      );
      setIncomes([]);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (title, data, color) => (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 3, py: 2.5 }}>
        <Typography variant="h6" fontWeight={600} color={color}>
          {title}
        </Typography>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#EEF2FF" }}>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={item.id ?? index} hover>
                  <TableCell>{item.title || "-"}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    ₹{formatAmount(item.amount)}
                  </TableCell>
                  <TableCell>
                    {item.date
                      ? String(item.date).slice(0, 10)
                      : item.income_date
                      ? String(item.income_date).slice(0, 10)
                      : item.expense_date
                      ? String(item.expense_date).slice(0, 10)
                      : "-"}
                  </TableCell>
                  <TableCell>{item.notes || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No {title.toLowerCase()} found for this date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

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

        {/* Date Filters */}
        <Card
          sx={{
            mt: 3,
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Reports
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
            Select a date range to view income and expenses.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: toDate || undefined }}
              sx={{
                width: { xs: "100%", sm: 220 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: fromDate || undefined }}
              sx={{
                width: { xs: "100%", sm: 220 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleGenerateReport}
              disabled={loading || !fromDate || !toDate}
              sx={{
                bgcolor: "#4F46E5",
                borderRadius: 2,
                px: 3,
                py: 1.5,
                minWidth: 170,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#4338CA",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Generate Report"
              )}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Card>

        {/* Tables appear only after generating the report */}
        {generated && (
          <>
            {renderTable("Income", incomes, "#16A34A")}
            {renderTable("Expenses", expenses, "#DC2626")}
          </>
        )}

        <Footer />
      </Box>
    </Box>
  );
}

export default Reports;
