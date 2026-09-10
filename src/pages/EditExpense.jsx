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
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import TitleIcon from "@mui/icons-material/Title";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon from "@mui/icons-material/Notes";

function EditExpense() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleEditExpense = async () => {
    try {
        const token = localStorage.getItem("token");
        
        console.log(token);
        console.log({
            title,
            amount,
            category,
            expenseDate,
            notes
        });
        await axios.put(
            `https://localhost:7024/api/Expense/updateExpense/${id}`,
            {
                title,
                amount,
                category,
                expenseDate,
                notes
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        
        navigate("/expenses");

    } 
    catch (error) {
    console.log(error.response);
    console.log(error.response?.data);
    console.log(error.response?.status);

    alert(JSON.stringify(error.response?.data));
     }
    };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC",
        py: 5,
        px: 2,
      }}
    >
      <Button
      component={Link}
      to="/expenses"
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


      
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
              color:"#111827"
          }}
      >
          Edit Expense
      </Typography>

      <Typography
          sx={{
              color:"#6B7280",
              mt:1,
              fontSize:"17px"
          }}
      >
           Update the details of your expense.
      </Typography>
      </Box>

      {/* Form */}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
         
          sx={{
              width:"100%",
              maxWidth:720,
              borderRadius:5,
              p:1,
              boxShadow:"0 20px 45px rgba(15,23,42,.08)",
              border:"1px solid #E5E7EB"
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
              sx={{
                    mb:3,

                    "& .MuiOutlinedInput-root":{
                        borderRadius:"14px",
                        height:58,

                        "&:hover fieldset":{
                            borderColor:"#4F46E5"
                        },

                        "&.Mui-focused fieldset":{
                            borderWidth:2
                        }
                    }
                }}
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
              sx={{
                mb:3,

                "& .MuiOutlinedInput-root":{
                    borderRadius:"14px",
                    height:58,

                    "&:hover fieldset":{
                        borderColor:"#4F46E5"
                    },

                    "&.Mui-focused fieldset":{
                        borderWidth:2
                    }
                }
            }}
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
              sx={{
                  mb:3,

                  "& .MuiOutlinedInput-root":{
                      borderRadius:"14px",
                      height:58,

                      "&:hover fieldset":{
                          borderColor:"#4F46E5"
                      },

                      "&.Mui-focused fieldset":{
                          borderWidth:2
                      }
                  }
              }}
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
              //label="Expense Date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}  
              InputLabelProps={{ shrink: true }}
              sx={{
                      mb:3,

                      "& .MuiOutlinedInput-root":{
                          borderRadius:"14px",
                          height:58,

                          "&:hover fieldset":{
                              borderColor:"#4F46E5"
                          },

                          "&.Mui-focused fieldset":{
                              borderWidth:2
                          }
                      }
                  }}
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
                onClick={handleEditExpense}

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
    </Box>
  );
}

export default EditExpense;