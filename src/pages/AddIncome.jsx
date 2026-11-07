
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
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

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function AddIncome() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
  ]);

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [incomeDate, setIncomeDate] = useState(getTodayDate());

  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [notes, setNotes] = useState("");

  // ERROR AND SUCCESS MESSAGES
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Add Category
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
    setCategory(trimmedCategory);

    setNewCategory("");
    setOpenCategoryDialog(false);
  };

  // Save Income
  const handleSaveIncome = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim()) {
      setErrorMessage("Please enter an income source.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setErrorMessage("Please enter a valid income amount.");
      return;
    }

    if (!incomeDate) {
      setErrorMessage("Please select an income date.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      console.log({
        title,
        amount,
        category,
        incomeDate,
        notes,
      });

      await axios.post(
        "https://manageexpense.runasp.net/api/Income/addIncome",
        {
          title,
          amount,
          category,
          incomeDate,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Income added successfully.");

      setTimeout(() => {
        navigate("/Income");
      }, 1000);

    } catch (error) {
      console.error("Income API Error:", error.response?.data);

      const apiError = error.response?.data;

      let message = "Unable to add income. Please try again.";

      if (apiError?.errors) {
        const validationErrors = Object.values(apiError.errors)
          .flat()
          .filter(Boolean);

        message = validationErrors.join(" ");
      } else if (apiError?.message) {
        message = apiError.message;
      } else if (typeof apiError === "string") {
        message = apiError;
      }

      setErrorMessage(message);
    }
  };

  // Common input styling
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
          {/* Left Side - Title */}
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
              Add New Income
            </Typography>

            <Typography
              sx={{
                color: "#64748B",
                mt: 0.8,
                fontSize: "15px",
              }}
            >
              Add the details of your income below.
            </Typography>
          </Box>

          {/* Right Side - Back Button */}
          <Button
            component={Link}
            to="/Income"
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

        {/* ================= ADD INCOME FORM ================= */}
        <Card
          sx={{
            width: "100%",
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            mb: 4,
          }}
        >
          {/* INLINE ERROR AND SUCCESS MESSAGES */}
          {errorMessage && (
            <Alert
              severity="error"
              onClose={() => setErrorMessage("")}
              sx={{
                mx: 3,
                mt: 3,
                borderRadius: 2,
                fontSize: "14px",
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert
              severity="success"
              onClose={() => setSuccessMessage("")}
              sx={{
                mx: 3,
                mt: 3,
                borderRadius: 2,
                fontSize: "14px",
              }}
            >
              {successMessage}
            </Alert>
          )}

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 4,
              },
            }}
          >
            {/* Form Header */}
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
                Enter information about your income.
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Income Title */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#334155",
                mb: 1,
              }}
            >
              Income Source *
            </Typography>

            <TextField
              required
              fullWidth
              placeholder="e.g. Salary, Freelancing, etc."
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

            {/* Amount + Category */}
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
              {/* Amount */}
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

            {/* Income Date */}
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
              onChange={(e) =>
                setIncomeDate(e.target.value)
              }
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

            {/* Notes */}
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

            {/* Buttons */}
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
              {/* Cancel */}
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

              {/* Save */}
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveIncome}
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
                Save Income
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
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
            onChange={(e) =>
              setNewCategory(e.target.value)
            }
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

export default AddIncome;
