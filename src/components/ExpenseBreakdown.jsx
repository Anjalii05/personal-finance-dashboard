import {Card, CardContent, Typography, Box, LinearProgress} from '@mui/material';
function ExpenseBreakdown() {
    return (
        <>
        <Card sx={{ mt: 4 , height: 350}}>
            <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Expense Breakdown</Typography>
            </CardContent>
            <CardContent>
                <Box  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Typography>Food</Typography>
                    <Typography>Rs500</Typography>
                </Box>
                <LinearProgress variant="determinate" value={50} />
                <Box  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Typography>Rent</Typography>
                    <Typography>Rs1500</Typography>
                </Box>
                <LinearProgress variant="determinate" value={75} />
                <Box  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Typography>Travel</Typography>
                    <Typography>Rs2000</Typography>
                </Box>
                <LinearProgress variant="determinate" value={90} />
                <Box  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <Typography>Entertainment</Typography>
                    <Typography>Rs300</Typography>
                </Box>
                <LinearProgress variant="determinate" value={30} />
            </CardContent>
        </Card>
    
       </> 
    );
}
export default ExpenseBreakdown;