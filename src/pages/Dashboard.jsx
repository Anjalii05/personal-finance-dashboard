import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import SummaryCard from "../components/summarycard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyExpenseChart from "../components/ExpenseChart";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);

  const currentMonth = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {fetchExpenses(); fetchIncomes(); fetchAllIncomes();}, []);
  const currentMonthExpenses = expenses.filter((expense) => {
  const date = new Date(expense.expense_date);

  return (
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear
  );
});

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://localhost:7024/api/Expense/getExpenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://localhost:7024/api/Income/getIncomeByMonth",
        {
          params: {
            month: currentMonthName,
            year: currentYear,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomes(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllIncomes = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://localhost:7024/api/Income/getIncomeByMonth",
      {
        params: {
          month: "All",
          year: currentYear,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllIncomes(response.data.data || []);
  } catch (error) {
    console.log(error);
  }
};

  const totalExpense = expenses
    .filter((expense) => {
      const date = new Date(expense.expense_date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );

  const netWorth = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0 ? (netWorth / totalIncome) * 100 : 0;

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
          p: 4,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Navbar />

        <Grid container spacing={3} sx={{ mt: 3, mb: 5 }}>
          <Grid sx={{ flex: 1, minWidth: 0 }}>
            <SummaryCard
              title="Total Income"
              amount={totalIncome.toFixed(2)}
            />
          </Grid>

          <Grid sx={{ flex: 1, minWidth: 0 }}>
            <SummaryCard
              title="Total Expenses"
              amount={totalExpense.toFixed(2)}
            />
          </Grid>

          <Grid sx={{ flex: 1, minWidth: 0 }}>
            <SummaryCard
              title="Net Worth"
              amount={netWorth.toFixed(2)}
            />
          </Grid>

          <Grid sx={{ flex: 1, minWidth: 0 }}>
            <SummaryCard
              title="Savings Rate"
              amount={`${savingsRate.toFixed(2)}%`}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            mb: 5,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ExpenseBreakdown expenses={currentMonthExpenses}/>
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <ExpensePieChart  expenses={currentMonthExpenses} />
          </Box>
        </Box>

        <Box sx={{ mb: 5 }}>
         <MonthlyExpenseChart expenses={expenses} />
        </Box>

        <RecentTransactions expenses={expenses} incomes={allIncomes}/>
      </Box>
    </Box>
  );
}

export default Dashboard;