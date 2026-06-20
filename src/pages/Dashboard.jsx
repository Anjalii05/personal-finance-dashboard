import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import SummaryCard from "../components/summarycard";
import RecentTransactions from "../components/RecentTransactions";
import {Box,Card, Grid, Typography,TextField, Button} from '@mui/material';


function Dashboard() {
  return (
    <>
    <Box sx={{display:"flex" , minHeight:"100vh"}}>
        <Sidebar />
        <Box sx={{flex:1, p: 3, mb: 3, backgroundColor: "#f8fafc",}}>
            <Navbar/>
            <Grid container spacing={2} >
            <Grid  item xs={12} md={3}><SummaryCard title="Total Income" amount="5000"></SummaryCard></Grid>
            <Grid  item xs={12} md={3}><SummaryCard title="Total Expenses" amount="3000"></SummaryCard></Grid>
            <Grid  item xs={12} md={3}><SummaryCard title="Net Worth" amount="2000"></SummaryCard></Grid>
            <Grid  item xs={12} md={3}><SummaryCard title="Savings Rate" amount="40%"></SummaryCard></Grid>
            </Grid>
            <RecentTransactions  />
        </Box>
    </Box>
    </>
  );
}
export default Dashboard;