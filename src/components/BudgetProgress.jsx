import {Card, CardContent, Typography,LinearProgress,Box} from '@mui/material';
function BudgetProgress(){


    return (
        <>
          <Card sx={{ mt: 4 , height: 350}}> 
            <CardContent>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Budget Progress</Typography>
                 <Typography variant="body1" sx={{ mb: 1 }}>Budget: Rs50000</Typography>
                 <Typography variant="body1" sx={{ mb: 1 }}>Spent: Rs30000</Typography>
                 <LinearProgress variant="determinate" value={60}  sx={{mt:2, height: 10, borderRadius: 5}} />
                 <Typography variant="body2" sx={{ mt: 1, textAlign: "right", }}>64% of budget spent</Typography>
            </CardContent>
          </Card>
        </>
    );
}
export default BudgetProgress