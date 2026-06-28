import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { month: "Jan", expenses: 4000 },
  { month: "Feb", expenses: 3000 },
  { month: "Mar", expenses: 5000 },
  { month: "Apr", expenses: 2000 },
  { month: "May", expenses: 6000 },
  { month: "Jun", expenses: 4500 },
];

function ExpenseCharts() {
  return (
    <>
      <Card sx={{ mt: 4, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>

          <Box mb={3}>
            <Typography variant="h5" fontWeight="bold">Monthly Expense Trend</Typography>
            <Typography variant="body2" color="text.secondary">Track your monthly spending pattern.</Typography>
          </Box>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="expenses" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>
    </>
  );
}

export default ExpenseCharts;