import {PieChart, Pie, Cell, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import {Card, CardContent, Typography} from '@mui/material';
const data =[
    {name: 'Food', value: 500},
    {name: 'Rent', value: 1500},
    {name: 'Travel', value: 2000},
    {name: 'Entertainment', value: 300},    
]
const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444"
];
function ExpensePieChart() {

    return (
      <>
        <Card sx={{ mt: 4 , height: 350}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Expense Pie Chart</Typography>
       
               <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        )
                        )}
                        
                    </Pie>
                        <Tooltip />
                        <Legend />
                </PieChart>
                </ResponsiveContainer>
             </CardContent>

            </Card>
      </>
    );
}
export default ExpensePieChart;