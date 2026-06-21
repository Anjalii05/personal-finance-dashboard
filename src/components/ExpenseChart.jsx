import {BarChart,Bar, XAxis, YAxis,ResponsiveContainer, Tooltip, Legend} from 'recharts';
import {Card, CardContent, Typography} from '@mui/material';

const data=[
    {month: 'Jan', expenses: 4000},
    {month: 'Feb', expenses: 3000},
    {month: 'Mar', expenses: 5000},
    {month: 'Apr', expenses: 2000},
    {month: 'May', expenses: 6000},
]
function ExpenseCharts() {
    return (
      <>
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Monthly Expenses</Typography>
            
           
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expenses" fill="#4F46E5" />
                </BarChart>
            </ResponsiveContainer>
            </CardContent>
            </Card> 
        </>
    );
}
export default ExpenseCharts; 