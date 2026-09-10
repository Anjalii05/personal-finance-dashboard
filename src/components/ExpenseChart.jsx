import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

function MonthlyExpenseChart({ expenses }) {
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize all months with 0 expenses
  const monthlyExpenses = monthOrder.map((month) => ({
    month,
    expenses: 0,
  }));

  // Add expenses to respective month
  expenses.forEach((expense) => {
    const month = new Date(expense.expense_date).toLocaleString("en-US", {
      month: "short",
    });

    const index = monthOrder.indexOf(month);

    if (index !== -1) {
      monthlyExpenses[index].expenses += Number(expense.amount);
    }
  });

  const totalExpense = monthlyExpenses.reduce(
    (sum, item) => sum + item.expenses,
    0
  );

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        boxShadow: 3,
        width: "100%",
      }}
    >
      <CardContent>
        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Monthly Expense Trend
          </Typography>

          
        </Box>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={monthlyExpenses}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [`₹${value}`, "Expenses"]}
            />

            <Bar
              dataKey="expenses"
              fill="#4F46E5"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MonthlyExpenseChart;