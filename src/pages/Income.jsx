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
import Footer from "../components/Footer";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar";


function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState("");
  // const [category, setCategory] = useState("");
  //const [month, setMonth] = useState("");
  const [month, setMonth] = useState(() => {
  return localStorage.getItem("expenseSelectedMonth") || "";
});

  // Fetch all incomes
  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://manageexpense.runasp.net/api/Income/getIncomes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  // Search + Month Filter
  const filteredIncomes = incomes.filter((income) => {
    const searchText = search.toLowerCase().trim();

    // Search by source,  or notes
    const matchesSearch =
      !searchText ||
      income.title?.toLowerCase().includes(searchText) ||
      income.notes?.toLowerCase().includes(searchText);

    // Get month from income date
    const incomeMonth = new Date(
      income.income_date
    ).toLocaleString("en-US", {
      month: "long",
    });

    // Month filter
    const matchesMonth =
      !month || incomeMonth === month;

    return matchesSearch && matchesMonth;
  });

  const handleDeleteIncome = async (incomeId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://manageexpense.runasp.net/api/Income/deleteIncome/${incomeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIncomes();
    } catch (error) {
      console.log(error);
    }
  };

  // Total should also reflect filtered data
  const totalIncomes = filteredIncomes.reduce(
    (sum, income) => sum + Number(income.amount || 0),
    0
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, md: 4 },
        }}
      >
        <Navbar />

        {/* Summary Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          {/* Total Incomes */}
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#EEF2FF",
                  color: "#4F46E5",
                  p: 1.2,
                  borderRadius: 2,
                }}
              >
                <AccountBalanceWalletIcon />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Total Incomes
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  ₹{totalIncomes.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Transactions */}
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#FEF3C7",
                  color: "#D97706",
                  p: 1.2,
                  borderRadius: 2,
                }}
              >
                <CalendarMonthIcon />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Transactions
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {filteredIncomes.length}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Average Income */}
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#DCFCE7",
                  color: "#16A34A",
                  p: 1.2,
                  borderRadius: 2,
                }}
              >
                <TrendingUpIcon />
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Average Income
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  ₹
                  {filteredIncomes.length
                    ? Math.round(
                        totalIncomes /
                          filteredIncomes.length
                      ).toLocaleString()
                    : 0}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Filters + Add Income */}
        <Paper
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <TextField
              label="Search Incomes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: 1,
                minWidth: 220,
                bgcolor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {/* Month */}
           {/* Month */}
<TextField
  select
  label="Month"
  value={month}
  onChange={(e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    localStorage.setItem("expenseSelectedMonth", selectedMonth);
  }}
  sx={{
    width: 180,
    bgcolor: "#fff",
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
  }}
>
  <MenuItem value="">All Months</MenuItem>
  <MenuItem value="January">January</MenuItem>
  <MenuItem value="February">February</MenuItem>
  <MenuItem value="March">March</MenuItem>
  <MenuItem value="April">April</MenuItem>
  <MenuItem value="May">May</MenuItem>
  <MenuItem value="June">June</MenuItem>
  <MenuItem value="July">July</MenuItem>
  <MenuItem value="August">August</MenuItem>
  <MenuItem value="September">September</MenuItem>
  <MenuItem value="October">October</MenuItem>
  <MenuItem value="November">November</MenuItem>
  <MenuItem value="December">December</MenuItem>
</TextField>

            {/* Add Income */}
            <Button
              component={Link}
              to="/add-income"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#4F46E5",
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#4338CA",
                },
              }}
            >
              Add Income
            </Button>
          </Box>
        </Paper>

        {/* Income Table */}
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#EEF2FF" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Source
                </TableCell>

               

                <TableCell sx={{ fontWeight: 700 }}>
                  Amount
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Date
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Notes
                </TableCell>

                <TableCell sx={{ fontWeight: 700 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredIncomes.map((income, index) => (
                <TableRow
                  key={income.id || index}
                  sx={{
                    "&:hover": {
                      bgcolor: "#F8FAFC",
                    },
                  }}
                >
                  {/* Source */}
                  <TableCell>
                    <Typography fontWeight={600}>
                      {income.title}
                    </Typography>
                  </TableCell>


                  {/* Amount */}
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#DC2626",
                    }}
                  >
                    ₹
                    {Number(
                      income.amount
                    ).toLocaleString()}
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    {new Date(
                      income.income_date
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  {/* Notes */}
                  <TableCell>
                    {income.notes || "-"}
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={`/edit-income/${income.id}`}
                      sx={{
                        bgcolor: "#EEF2FF",
                        color: "#4F46E5",
                        mr: 1,
                        "&:hover": {
                          bgcolor: "#DBEAFE",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleDeleteIncome(
                          income.id
                        )
                      }
                      sx={{
                        bgcolor: "#FEE2E2",
                        color: "#DC2626",
                        "&:hover": {
                          bgcolor: "#FECACA",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* No Results */}
              {filteredIncomes.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    <Typography
                      color="text.secondary"
                      sx={{ py: 5 }}
                    >
                      No incomes found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Footer />
      </Box>
    </Box>
  );
}

export default Incomes;