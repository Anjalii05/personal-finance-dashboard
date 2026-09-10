import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";




function Income() {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editedSource, setEditedSource] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(currentMonth);
  const [year] = useState(new Date().getFullYear());
  const [search, setSearch] = useState("");

  const handleEdit = (income) => {
  setEditingId(income.id);
  setEditedSource(income.source);
  setEditedAmount(income.amount);
};

const handleSave = () => {
  setIncomes((prev) =>
    prev.map((income) =>
      income.id === editingId
        ? {
            ...income,
            source: editedSource,
            amount: editedAmount,
          }
        : income
    )
  );

  setEditingId(null);
  setEditedSource("");
  setEditedAmount("");
};
  const fetchIncomes = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://localhost:7024/api/Income/getIncomeByMonth",
        {
          params: {
            month,
            year,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching income:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [month, year]);

  const filteredIncomes = incomes.filter((income) =>
    income.source.toLowerCase().includes(search.toLowerCase())
  );

  const deleteIncome = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this income?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://localhost:7024/api/Income/deleteIncome/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchIncomes();

    alert("Income deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete income.");
  }
};

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Header */}
      <Button
              component={Link}
              to="/dashboard"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: "#4F46E5",
                mb: 4,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#EEF2FF",
                },
              }}
            >
              Back to Expenses
            </Button>
      <Card
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 2,
        }}
      >
        
        
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Income
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Track and manage all your income in one place.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/add-income"
          sx={{
            background: "#4F46E5",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              background: "#4338CA",
            },
          }}
        >
          Add Income
        </Button>
      </Card>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search Income"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          label="Month"
          sx={{ width: 180 }}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
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
      </Box>

      {/* Income List */}
      <Card
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredIncomes.length === 0 ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No income records found.
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Click <b>Add Income</b> to create your first income entry.
            </Typography>
          </Box>
        ) : (
          filteredIncomes.map((income) => (
  <Card
    key={income.id}
    sx={{
      p: 2,
      mb: 2,
      border: "1px solid #e0e0e0",
      borderRadius: 2,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box sx={{ flex: 1 }}>
      {editingId === income.id ? (
        <>
          <TextField
            fullWidth
            label="Source"
            value={editedSource}
            onChange={(e) => setEditedSource(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography color="text.secondary">
            Date: {new Date(income.income_date).toLocaleDateString()}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold">
            {income.source}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Amount: ₹{income.amount}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Date: {new Date(income.income_date).toLocaleDateString()}
          </Typography>
        </>
      )}
    </Box>

    <Box sx={{ display: "flex", gap: 1 }}>
      {editingId === income.id ? (
        <Button
          variant="contained"
          size="small"
          onClick={handleSave}
        >
          Save
        </Button>
      ) : (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(income)}
            sx={{
              border: "1px solid #1976d2",
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => deleteIncome(income.id)}
            sx={{
              border: "1px solid #ef5350",
              "&:hover": {
                backgroundColor: "#ffebee",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Box>
  </Card>
))
           
        )}
      </Card>
    </Box>
  );
}

export default Income;