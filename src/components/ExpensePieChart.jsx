import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#14B8A6",
];

function ExpensePieChart({ expenses }) {
  // Group expenses by category
  const data = Object.values(
    expenses.reduce((acc, expense) => {
      const category = expense.category;

      if (!acc[category]) {
        acc[category] = {
          name: category,
          value: 0,
        };
      }

      acc[category].value += Number(expense.amount);

      return acc;
    }, {})
  );

  const totalExpense = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        boxShadow: 3,
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Expense Categories
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Total Spent: ₹{totalExpense.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={4}
              cornerRadius={8}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip formatter={(value) => [`₹${value}`, "Amount"]} />
            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default ExpensePieChart;