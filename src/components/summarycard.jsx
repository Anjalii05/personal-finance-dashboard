import {Card,CardContent, Typography} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import PaidIcon from '@mui/icons-material/Paid';
function summarycard({title,amount}){
    return(
        <>
        <Card  sx={{borderRadius: 3, boxShadow: 2,}}>
            <CardContent>
                {title === "Total Income" && <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#4F46E5" }} />}
                {title === "Total Expenses" && <TrendingUpIcon sx={{ fontSize: 40, color: "#4F46E5" }} />}
                {title === "Net Worth" && <SavingsIcon sx={{ fontSize: 40, color: "#4F46E5" }} />}  
                {title === "Savings Rate" && <PaidIcon sx={{ fontSize: 40, color: "#4F46E5" }} />}
               <Typography color="text.secondary">{title}</Typography>
               <Typography variant="h6" fontWeight={700}> ${amount}</Typography>
            </CardContent>
        </Card>     
        
        </>
    )
}
export default summarycard;