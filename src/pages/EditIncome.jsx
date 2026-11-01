import {
  Box,
  Card,
  CardContent,
  Alert,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import TitleIcon from "@mui/icons-material/Title";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from "@mui/icons-material/Notes";

import Sidebar from "../components/sidebar";
import Footer from "../components/footer";

function EditIncome() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================
  // FORM STATES
  // =========================

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const [notes, setNotes] = useState("");

  // =========================
  // CATEGORY STATES
  // =========================

  const [categories, setCategories] = useState([
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
  ]);

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // =========================
  // OTHER STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =========================
  // INPUT STYLING
  // =========================

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
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
  };

  // =========================
  // FETCH SELECTED INCOME
  // =========================

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://localhost:7024/api/Income/getIncomes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const incomes = response.data.data || [];

        console.log("Edit Income URL ID:", id);
        console.log("All Incomes:", incomes);

        // Find exact income
        const selectedIncome = incomes.find(
          (income) => String(income.id) === String(id)
        );

        console.log("Selected Income:", selectedIncome);

        if (!selectedIncome) {
          setErrorMessage("Income not found.");
          navigate("/Income");
          return;
        }

        // =========================
        // SET EXISTING VALUES
        // =========================

        setTitle(selectedIncome.title || "");

        setAmount(
          selectedIncome.amount !== null &&
            selectedIncome.amount !== undefined
            ? String(selectedIncome.amount)
            : ""
        );

        setCategory(selectedIncome.category || "");

        setNotes(selectedIncome.notes || "");

        // =========================
        // SET DATE
        // =========================

        if (selectedIncome.income_date) {
          const date = new Date(selectedIncome.income_date);

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          setIncomeDate(`${year}-${month}-${day}`);
        }
      } catch (error) {
        console.error("Error fetching income:", error);

        const apiError = error.response?.data;
        const message =
          apiError?.errors
            ? Object.values(apiError.errors).flat().filter(Boolean).join(" ")
            : apiError?.message ||
              (typeof apiError === "string" ? apiError : "") ||
              "Unable to load income details.";

        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncome();
  }, [id, navigate]);

  // =========================
  // ADD CATEGORY
  // =========================

  const handleAddCategory = () => {
    const trimmedCategory = newCategory.trim();

    if (!trimmedCategory) return;

    // Prevent duplicate categories
    if (
      categories.some(
        (item) =>
          item.toLowerCase() === trimmedCategory.toLowerCase()
      )
    ) {
      return;
    }

    setCategories([...categories, trimmedCategory]);

    // Automatically select new category
    setCategory(trimmedCategory);

    setNewCategory("");
    setOpenCategoryDialog(false);
  };

  // =========================
  // SAVE CHANGES
  // =========================

  const handleEditIncome = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter income title.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setErrorMessage("Please enter a valid amount greater than 0.");
      return;
    }

    // if (!category) {
    //   alert("Please select category.");
    //   return;
    // }

    if (!incomeDate) {
      setErrorMessage("Please select income date.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const requestBody = {
        title: title.trim(),
        amount: Number(amount),
        category: category,
        incomeDate: incomeDate,
        notes: notes.trim(),
      };

      console.log("Updating Income ID:", id);
      console.log("Update Request:", requestBody);

      await axios.put(
        `https://localhost:7024/api/Income/updateIncome/${id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Income updated successfully.");

      setTimeout(() => {
        navigate("/Income");
      }, 1000);
    } catch (error) {
      console.error("Error updating income:", error);

      const apiError = error.response?.data;
      const message =
        apiError?.errors
          ? Object.values(apiError.errors).flat().filter(Boolean).join(" ")
          : apiError?.message ||
            (typeof apiError === "string" ? apiError : "") ||
            "Failed to update income.";

      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING SCREEN
  // =========================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          display: "flex",
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // =========================
  // MAIN UI
  // =========================

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 2, md: 4 },
        }}
      >
        {/* ================= PAGE HEADER ================= */}

        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* LEFT SIDE */}

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: "28px",
                  md: "32px",
                },
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.2,
              }}
            >
              Edit Income
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                mt: 0.8,
                fontSize: "15px",
              }}
            >
              Update the details of your income below.
            </Typography>
          </Box>

          {/* RIGHT SIDE */}

          <Button
            component={Link}
            to="/incomes"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "#4F46E5",
              borderColor: "#4F46E5",
              borderRadius: 2,
              px: 2.5,
              py: 1.2,
              minHeight: 44,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "14px",
              whiteSpace: "nowrap",

              "&:hover": {
                borderColor: "#4338CA",
                color: "#4338CA",
                bgcolor: "#EEF2FF",
              },
            }}
          >
            Back to Incomes
          </Button>
        </Box>

        {/* ================= EDIT INCOME FORM ================= */}

        <Card
          sx={{
            width: "100%",
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            mb: 4,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                {successMessage}
              </Alert>
            )}

            {/* FORM HEADER */}

            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "19px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Income Details
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#64748B",
                  mt: 0.5,
                }}
              >
                Update information about your income.
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* ================= TITLE ================= */}

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
                mb: 1,
              }}
            >
              Income Title *
            </Typography>

            <TextField
              required
              fullWidth
              placeholder="e.g. Salary, Freelance Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                ...inputStyles,
                mb: 3,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon
                      sx={{
                        color: "#4F46E5",
                        fontSize: 21,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* ================= AMOUNT + CATEGORY ================= */}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2.5,
                mb: 3,
              }}
            >
              {/* ================= AMOUNT ================= */}

              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#334155",
                    mb: 1,
                  }}
                >
                  Amount *
                </Typography>

                <TextField
                  required
                  fullWidth
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={inputStyles}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeIcon
                          sx={{
                            color: "#4F46E5",
                            fontSize: 21,
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            {/* ================= INCOME DATE ================= */}

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
                mb: 1,
              }}
            >
              Income Date *
            </Typography>

            <TextField
              required
              fullWidth
              type="date"
              value={incomeDate}
              onChange={(e) => setIncomeDate(e.target.value)}
              sx={{
                ...inputStyles,
                mb: 3,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon
                      sx={{
                        color: "#4F46E5",
                        fontSize: 21,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* ================= NOTES ================= */}

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
                mb: 1,
              }}
            >
              Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Add any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",

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
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      alignSelf: "flex-start",
                      mt: 1,
                    }}
                  >
                    <NotesIcon
                      sx={{
                        color: "#4F46E5",
                        fontSize: 21,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {/* ================= BUTTONS ================= */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 3.5,
                pt: 2.5,
                borderTop: "1px solid #E5E7EB",

                "@media (max-width: 480px)": {
                  flexDirection: "column-reverse",

                  "& button": {
                    width: "100%",
                  },
                },
              }}
            >
              {/* CANCEL */}

              <Button
                component={Link}
                to="/Income"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#374151",
                  borderColor: "#D1D5DB",

                  "&:hover": {
                    borderColor: "#9CA3AF",
                    bgcolor: "#F9FAFB",
                  },
                }}
              >
                Cancel
              </Button>

              {/* SAVE */}

              <Button
                variant="contained"
                startIcon={
                  saving ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <SaveIcon />
                  )
                }
                onClick={handleEditIncome}
                disabled={saving}
                sx={{
                  bgcolor: "#4F46E5",
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",

                  "&:hover": {
                    bgcolor: "#4338CA",
                    boxShadow:
                      "0 4px 12px rgba(79, 70, 229, 0.25)",
                  },
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* ================= FOOTER ================= */}

        <Footer />
      </Box>

      {/* ================= ADD CATEGORY DIALOG ================= */}

      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          Add New Category
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Category Name"
            placeholder="e.g. Health"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{
              mt: 1,

              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={() => {
              setNewCategory("");
              setOpenCategoryDialog(false);
            }}
            sx={{
              textTransform: "none",
              color: "#374151",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            sx={{
              bgcolor: "#4F46E5",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,

              "&:hover": {
                bgcolor: "#4338CA",
              },
            }}
          >
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EditIncome;