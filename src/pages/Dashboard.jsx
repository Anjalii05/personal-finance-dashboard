import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import SummaryCard from "../components/summarycard";
import RecentTransactions from "../components/RecentTransactions";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyExpenseChart from "../components/ExpenseChart";
import BudgetProgress from "../components/BudgetProgress";
import { Box, Grid } from "@mui/material";

function Dashboard() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>

      <Sidebar />

      <Box sx={{ flex: 1, px: 4, py: 3 }}>

        <Navbar />

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard title="Total Income" amount="5000" />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard title="Total Expenses" amount="3000" />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard title="Net Worth" amount="2000" />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <SummaryCard title="Savings Rate" amount="40%" />
          </Grid>
        </Grid>

        {/* Dashboard Analytics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>

          <Grid item xs={12} lg={4}>
            <ExpenseBreakdown />
          </Grid>

          <Grid item xs={12} lg={4}>
            <ExpensePieChart />
          </Grid>

          <Grid item xs={12} lg={4}>
            <BudgetProgress />
          </Grid>

        </Grid>

        {/* Monthly Chart */}
        <Box sx={{ mb: 4 }}>
          <MonthlyExpenseChart />
        </Box>

        {/* Transactions */}
        <RecentTransactions />

      </Box>

    </Box>
  );
}

export default Dashboard;