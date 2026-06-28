import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const data = [
  { name: "Food", value: 500 },
  { name: "Rent", value: 1500 },
  { name: "Travel", value: 2000 },
  { name: "Entertainment", value: 300 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

function ExpensePieChart() {
  return (
    <>
      <Card sx={{ mt: 4, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h5" fontWeight="bold">Expense Categories</Typography>
              <Typography variant="body2" color="text.secondary">Total Spent: ₹{totalExpense.toLocaleString()}</Typography>
            </Box>
          </Box>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={4} cornerRadius={8}>
                {data.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>

        </CardContent>
      </Card>
    </>
  );
}

export default ExpensePieChart;