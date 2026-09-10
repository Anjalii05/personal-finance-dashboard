import {Box,Typography,Button,TextField,MenuItem,Table,TableBody,TableCell,TableContainer, TableHead,TableRow,Paper,IconButton,Chip,} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



function Expenses() {
              
              const [expenses, setExpenses] = useState([]);
              const [search, setSearch] = useState("");
              const [category, setCategory] = useState("");
              const [month, setMonth] = useState("");
              const[deleteExpenseId, setDeleteExpenseId] = useState(null);

              
              
              
              // Fetch expenses

              const fetchExpenses = async () => {
              try {
                const token = localStorage.getItem("token");

                  const response = await axios.get(
                    "https://localhost:7024/api/Expense/getExpenses",
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                      params: {
                        search: search || null,
                        category: category || null,
                        month: month || null,
                      },
                    }
                  );

                setExpenses(response.data.data);
              } catch (error) {
                console.log(error);
              }
            };
            useEffect(() => {fetchExpenses();}, [search, category, month]);


            const handleDeleteExpense = async (expenseId) => {
              try {
                const token = localStorage.getItem("token"); 
                 
                await axios.delete(`https://localhost:7024/api/Expense/deleteExpense/${expenseId}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                fetchExpenses(); // Refresh the expense list
              } catch (error) {
                console.log(error);
              }
            };

            useEffect(() => {handleDeleteExpense(deleteExpenseId);}, [deleteExpenseId]);

  return (
    <Box
        sx={{
          p: 4,
          bgcolor: "#F8FAFC",
          minHeight: "100vh",
        }}
      >
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
      
     
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}
>
        <Box>
          <Typography
        variant="h4"
        fontWeight={700}
        color="#1E293B"
    >
        Expenses
    </Typography>

    <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
    >
        Track and manage all your expenses in one place.
    </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
           component={Link}
           to="/add-expense"
          sx={{
            bgcolor: "#4F46E5",
            px: 3,
            py: 1.3,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: 4,
            "&:hover": {
              bgcolor: "#4338CA",
              transform: "translateY(-2px)",
            },
          }}
        >
          Add Expense
        </Button>
      </Box>

      {/* Search & Filter */}
      
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Search Expenses"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{bgcolor: "#fff","& .MuiOutlinedInput-root": {borderRadius: 2,
        },
    }}
        />

        <TextField
          select
          label="Category"
          defaultValue=""
         
          sx={{
              width:180,
              bgcolor:"#fff",
              "& .MuiOutlinedInput-root":{
                  borderRadius:2
              }
          }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Bills">Bills</MenuItem>
          <MenuItem value="Shopping">Shopping</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
        </TextField>

        <TextField
          select
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{
              width:180,
              bgcolor:"#fff",
              "& .MuiOutlinedInput-root":{
                  borderRadius:2
              }
          }}
        >
          <MenuItem value="">All</MenuItem>
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
       
      {/* Expense Table */}

      <TableContainer
        component={Paper}
        sx={{
            borderRadius:4,
            overflow:"hidden",
            boxShadow:"0 4px 20px rgba(0,0,0,0.08)"
        }}
      >
        <Table>

          <TableHead>
            <TableRow sx={{bgcolor:"#EEF2FF"}}>
              <TableCell sx={{ fontWeight:700, color:"#374151",fontSize:15 }}>Title</TableCell>
              <TableCell sx={{ fontWeight:700, color:"#374151",fontSize:15 }}>Category</TableCell>
              <TableCell sx={{ fontWeight:700, color:"#374151",fontSize:15 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight:700, color:"#374151",fontSize:15 }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight:700, color:"#374151",fontSize:15 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {expenses.map((expense, index) => (
                <TableRow
                  key={index}
                  sx={{
                  transition:"0.2s",

                  "&:hover":{
                      bgcolor:"#F8FAFC",
                      transform:"scale(1.002)"
                  }
              }}
                  
              >
                <TableCell>{expense.title}</TableCell>

                <TableCell>{expense.category}</TableCell>

                <TableCell
                  sx={{
                    fontWeight: 600,
                    color:"#16A34A",
                  }}
                >
                  ₹{expense.amount.toLocaleString()}
                </TableCell>

                <TableCell>
                  {new Date(expense.expense_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                })}
                </TableCell>

               

                <TableCell align="center">
                  {/* <IconButton
                  
                 
                        sx={{
                            bgcolor:"#EEF2FF",
                            mr:1,

                            "&:hover":{
                                bgcolor:"#DBEAFE"
                            }
                        }}
                  component={Link}
                  to={`/edit-expense/${expense.id}`}  
                >
                  <EditIcon />
                </IconButton> */}

                  <IconButton 
                  
                      sx={{
                          bgcolor:"#FEE2E2",

                          "&:hover":{
                              bgcolor:"#FECACA"
                          }
                      }}
                      color="error" onClick={() => setDeleteExpenseId(expense.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}

export default Expenses;
